import { loginV2 } from "@/services/login.service";
import { MIRTH_URL_V2, callMirthApiV2 } from "@/services/rest.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        let [channelsRes, channelGroupsRes, channelsStatisticsRes, channelStatusesRes] =
            await Promise.all([
                callMirthApiV2(MIRTH_URL_V2 + "channels"),
                callMirthApiV2(MIRTH_URL_V2 + "channelgroups"),
                callMirthApiV2(MIRTH_URL_V2 + "channels/statistics"),
                callMirthApiV2(MIRTH_URL_V2 + "channels/statuses"),
            ]);

        if (
            channelsRes.status == 200
            && channelGroupsRes.status == 200
            && channelsStatisticsRes.status == 200
            && channelStatusesRes.status == 200
        ) {
            const channels = await channelsRes.json()
            const channelGroups = await channelGroupsRes.json()
            const channelsStatistics = await channelsStatisticsRes.json()
            const channelStatuses = await channelStatusesRes.json()

            const listaChannelsApi = channels.list.channel;
            const listaChannelGroupsApi = channelGroups.list.channelGroup;
            const listaChannelsStatisticsApi = channelsStatistics.list.channelStatistics;
            const listaChannelStatusesApi = channelStatuses.list.dashboardStatus;

            const datiPerTabella = generaStrutturaPerTemplate(
                listaChannelsApi,
                listaChannelGroupsApi,
                listaChannelsStatisticsApi,
                listaChannelStatusesApi
            );

            return NextResponse.json({
                channels: listaChannelsApi,
                groups: listaChannelGroupsApi,
                statistics: listaChannelsStatisticsApi,
                statuses: listaChannelStatusesApi,
                _template: datiPerTabella,
            });
        }

        let errorList = [];
        if (channelsRes.status != 200) {
            errorList.push({
                name: "channels",
                reason: channelsRes.statusText,
                status: channelsRes.status,
            });
        }
        if (channelGroupsRes.status != 200) {
            errorList.push({
                name: "channelGroups",
                reason: channelGroupsRes.statusText,
                status: channelGroupsRes.status,
            });
        }
        if (channelsStatisticsRes.status != 200) {
            errorList.push({
                name: "channelsStatistics",
                reason: channelsStatisticsRes.statusText,
                status: channelsStatisticsRes.status,
            });
        }
        if (channelStatusesRes.status != 200) {
            errorList.push({
                name: "channelStatuses",
                reason: channelStatusesRes.statusText,
                status: channelStatusesRes.status,
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
            id: channelGroup.id,
            name: channelGroup.name,
            channels: getChannelListForChannelGroup(channelGroup.channels.channel, {
                listaChannelsApi: listaChannelsApi,
                listaChannelsStatisticsApi: listaChannelsStatisticsApi,
                listaChannelStatusesApi: listaChannelStatusesApi,
            }),
        };
    });
};

const getChannelListForChannelGroup = (
    listaCanaliPerGruppoCorrente: any[],
    {
        listaChannelsApi,
        listaChannelsStatisticsApi,
        listaChannelStatusesApi,
    }: {
        listaChannelsApi: any[];
        listaChannelsStatisticsApi: any[];
        listaChannelStatusesApi: any[];
    }
): any[] => {
    if (Array.isArray(listaCanaliPerGruppoCorrente)) {
        return listaCanaliPerGruppoCorrente.map((canale: any) => {
            const canaleCorrente = canale;

            const infoPerCanale = listaChannelsApi.find(
                (canaleDaApi: any) =>
                    canaleDaApi.id == canaleCorrente.id
            );

            const statistichePerCanale = listaChannelsStatisticsApi.find(
                (channelsStatistic: any) =>
                    channelsStatistic.channelId === canaleCorrente.id
            );

            const statusPerCanale = listaChannelStatusesApi.find(
                (channelStatus: any) =>
                    channelStatus.channelId === canaleCorrente.id
            );

            return {
                id: infoPerCanale?.id ?? "",
                name: infoPerCanale?.name ?? "",
                description: infoPerCanale?.description ?? "",
                sourceDestinationChannels: getSourceDestinationPerCanale(statusPerCanale?.childStatuses?.dashboardStatus),
                statistics: {
                    received: statistichePerCanale?.received ?? "",
                    sent: statistichePerCanale?.sent ?? "",
                    error: statistichePerCanale?.error ?? "",
                    filtered: statistichePerCanale?.filtered ?? "",
                    queued: statistichePerCanale?.queued ?? "",
                },
                status: {
                    state: statusPerCanale?.state ?? "",
                    lastDeployed: statusPerCanale?.deployedDate.time ?? "",
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
                    [entry["com.mirth.connect.donkey.model.message.Status"]]: entry["long"]
                }
            }

            return {
                id: childStatus.channelId,
                name: childStatus.name,
                state: childStatus.state,
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