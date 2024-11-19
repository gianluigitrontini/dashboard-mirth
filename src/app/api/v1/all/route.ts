import { MIRTH_URL, callMirthApi } from "@/services/rest.service";
import { NextResponse } from "next/server";
var xml2js = require('xml2js');

export async function GET(request: Request) {
    try {
        const [channels, channelGroups, channelsStatistics, channelStatuses] =
            await Promise.all([
                callMirthApi(MIRTH_URL + "channels", { request }),
                callMirthApi(MIRTH_URL + "channelgroups", { request }),
                callMirthApi(MIRTH_URL + "channels/statistics", { request }),
                callMirthApi(MIRTH_URL + "channels/statuses", { request }),
            ]);

        if (
            channels.status == 200
            && channelGroups.status == 200
            && channelsStatistics.status == 200
            && channelStatuses.status == 200
        ) {
            const parser = new xml2js.Parser({ explicitArray: false });

            const _listaChannelsApi = await parser.parseStringPromise(await channels.text());
            const listaChannelsApi = _listaChannelsApi.list.channel;

            const _listaChannelGroupsApi = await parser.parseStringPromise(await channelGroups.text());
            const listaChannelGroupsApi = _listaChannelGroupsApi.list.channelGroup;

            const _listaChannelsStatisticsApi = await parser.parseStringPromise(await channelsStatistics.text());
            const listaChannelsStatisticsApi = _listaChannelsStatisticsApi.list.channelStatistics;

            const _listaChannelStatusesApi = await parser.parseStringPromise(await channelStatuses.text());
            const listaChannelStatusesApi = _listaChannelStatusesApi.list.dashboardStatus;

            const datiPerTabella = generaStrutturaPerTemplate(
                listaChannelsApi,
                listaChannelGroupsApi,
                listaChannelsStatisticsApi,
                listaChannelStatusesApi
            );

            return NextResponse.json(
                JSON.stringify({
                    channels: listaChannelsApi,
                    groups: listaChannelGroupsApi,
                    statistics: listaChannelsStatisticsApi,
                    statuses: listaChannelStatusesApi,
                    _template: datiPerTabella,
                })
            );
        }

        let errorList = [];

        if (channels.status != 200) {
            errorList.push({
                name: "channels",
                reason: channels.statusText,
                status: channels.status,
            });
        }
        if (channelGroups.status != 200) {
            errorList.push({
                name: "channelGroups",
                reason: channelGroups.statusText,
                status: channelGroups.status,
            });
        }
        if (channelsStatistics.status != 200) {
            errorList.push({
                name: "channelsStatistics",
                reason: channelsStatistics.statusText,
                status: channelsStatistics.status,
            });
        }
        if (channelStatuses.status != 200) {
            errorList.push({
                name: "channelStatuses",
                reason: channelStatuses.statusText,
                status: channelStatuses.status,
            });
        }

        // Ritorna il primo errore
        throw { status: errorList[0].status, msg: "Errore in: " + errorList.map((e) => e.name).join(", ") };
    } catch (error: any) {
        return NextResponse.json(
            null,
            {
                status: error.status,
                statusText: error.msg,
            }
        );
    }
}

const generaStrutturaPerTemplate = (
    listaChannelsApi: any[],
    listaChannelGroupsApi: any[],
    listaChannelsStatisticsApi: any[],
    listaChannelStatusesApi: any[]
) => {
    return listaChannelGroupsApi.map((channelGroup: any) => {
        return {
            id: channelGroup.id["_text"],
            name: channelGroup.name["_text"],
            channels: getChannelListForChannelGroup(channelGroup.channels.channel, {
                channels: listaChannelsApi,
                channelsStatistics: listaChannelsStatisticsApi,
                channelStatuses: listaChannelStatusesApi,
            }),
        };
    });
};

const getChannelListForChannelGroup = (
    listaCanaliPerGruppoCorrente: any[],
    {
        channels,
        channelsStatistics,
        channelStatuses,
    }: {
        channels: any[];
        channelsStatistics: any[];
        channelStatuses: any[];
    }
): any[] => {
    if (Array.isArray(listaCanaliPerGruppoCorrente)) {
        return listaCanaliPerGruppoCorrente.map((canale: any) => {
            const canaleCorrente = canale;

            const infoPerCanale = channels.find(
                (canaleDaApi: any) =>
                    canaleDaApi.id["_text"] == canaleCorrente.id["_text"]
            );

            const statistichePerCanale = channelsStatistics.find(
                (channelsStatistic: any) =>
                    channelsStatistic.channelId["_text"] === canaleCorrente.id["_text"]
            );

            const statusPerCanale = channelStatuses.find(
                (channelStatus: any) =>
                    channelStatus.channelId["_text"] === canaleCorrente.id["_text"]
            );

            return {
                id: infoPerCanale?.id["_text"] ?? "",
                name: infoPerCanale?.name["_text"] ?? "",
                description: infoPerCanale?.description["_text"] ?? "",
                sourceDestinationChannels: getSourceDestinationPerCanale(statusPerCanale?.childStatuses?.dashboardStatus),
                statistics: {
                    received: statistichePerCanale?.received["_text"] ?? "",
                    sent: statistichePerCanale?.sent["_text"] ?? "",
                    error: statistichePerCanale?.error["_text"] ?? "",
                    filtered: statistichePerCanale?.filtered["_text"] ?? "",
                    queued: statistichePerCanale?.queued["_text"] ?? "",
                },
                status: {
                    state: statusPerCanale?.state["_text"] ?? "",
                    lastDeployed: statusPerCanale?.deployedDate["time"] ?? "",
                },
            };
        });
    }

    return [];
};

const getSourceDestinationPerCanale = (listaChildren: any[]): {
    id: string;
    name: string;
    state: string;
    statistics: {
        RECEIVED: string;
        FILTERED: string;
        SENT: string;
        ERROR: string;
    }
}[] => {
    if (Array.isArray(listaChildren)) {
        return listaChildren.map((childStatus: any) => {
            // Ottiene le statistiche
            let stats = {}
            for (let entry of childStatus.statistics.entry) {
                stats = {
                    ...stats,
                    [entry["com.mirth.connect.donkey.model.message.Status"]["_text"]]: entry["long"]["_text"]
                }
            }

            return {
                id: childStatus.channelId["_text"],
                name: childStatus.name["_text"],
                state: childStatus.state["_text"],
                statistics: stats
            } as {
                id: string;
                name: string;
                state: string;
                statistics: {
                    RECEIVED: string;
                    FILTERED: string;
                    SENT: string;
                    ERROR: string;
                }
            }
        })
    }

    return []
}