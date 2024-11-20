import { callMirthApiV2 } from "@/services/rest.service";
import { ensureArray } from "@/services/utils.service";
import { NextResponse } from "next/server";

interface ChannelApiInterface {
    id: string;
    name: string;
    description: string;
}

interface ChannelGroup {
    id: string;
    name: string;
    channels: { channel: ChannelApiInterface[] };
}

interface ChannelStatistics {
    channelId: string;
    received: string;
    sent: string;
    error: string;
    filtered: string;
    queued: string;
}

interface ChannelStatus {
    channelId: string;
    state: string;
    deployedDate: { time: string };
    childStatuses?: { dashboardStatus: any[] };
}

export interface DatiPerTabellaInterface {
    id: string
    name: string
    channels: {
        id: string;
        name: string;
        description: string;
        sourceDestinationChannels: any[];
        statistics: {
            received: string
            sent: string
            error: string
            filtered: string
            queued: string
        };
        status: {
            state: string
            lastDeployed: string
        };
    }[]
}

export async function GET(request: Request) {
    try {
        const { channels, channelGroups, channelsStatistics, channelStatuses } = await fetchMirthData();

        const datiPerTabella = generaStrutturaPerTemplate(
            channels,
            channelGroups,
            channelsStatistics,
            channelStatuses
        );

        return NextResponse.json({
            data: datiPerTabella,
            channels,
            channelGroups,
            channelsStatistics,
            channelStatuses,
        });
    } catch (error: any) {
        // loginV2()
        console.error("Error fetching Mirth data:", error);
        return NextResponse.json({ error: error || "Internal Server Error" }, { status: 500 });
    }
}

async function fetchMirthData() {
    const [channelsRes, channelGroupsRes, channelsStatisticsRes, channelStatusesRes] = await Promise.all([
        callMirthApiV2("channels"),
        callMirthApiV2("channelgroups"),
        callMirthApiV2("channels/statistics"),
        callMirthApiV2("channels/statuses"),
    ])

    const responses = [channelsRes, channelGroupsRes, channelsStatisticsRes, channelStatusesRes];

    const errorList = responses
        .filter(res => !res.ok)
        .map(res => ({
            name: res.url.split('/').pop(),
            reason: res.statusText,
            status: res.status,
        }));

    if (errorList.length > 0) {
        console.log(errorList)
        throw ({ ok: false, msg: "Errore in: " + errorList.map(e => e.name).join(", "), status: errorList[0].status });
    }

    const [channels, channelGroups, channelsStatistics, channelStatuses] = await Promise.all(responses.map(res => res.json()));

    return {
        channels: channels.list.channel,
        channelGroups: channelGroups.list.channelGroup,
        channelsStatistics: channelsStatistics.list.channelStatistics,
        channelStatuses: channelStatuses.list.dashboardStatus
    }
}

const generaStrutturaPerTemplate = (
    listaChannelsApi: ChannelApiInterface[],
    listaChannelGroupsApi: ChannelGroup[],
    listaChannelsStatisticsApi: ChannelStatistics[],
    listaChannelStatusesApi: ChannelStatus[]
) => {
    return listaChannelGroupsApi.map(channelGroup => ({
        id: channelGroup.id,
        name: channelGroup.name,
        channels: getChannelListForChannelGroup(channelGroup.channels.channel, {
            listaChannelsApi,
            listaChannelsStatisticsApi,
            listaChannelStatusesApi,
        }),
    }));
};

const getChannelListForChannelGroup = (
    listaCanaliPerGruppoCorrente: ChannelApiInterface[],
    {
        listaChannelsApi,
        listaChannelsStatisticsApi,
        listaChannelStatusesApi,
    }: {
        listaChannelsApi: ChannelApiInterface[];
        listaChannelsStatisticsApi: ChannelStatistics[];
        listaChannelStatusesApi: ChannelStatus[];
    }
): any[] => {
    return ensureArray(listaCanaliPerGruppoCorrente).map(canaleCorrente => {
        const infoPerCanale = listaChannelsApi.find(canaleDaApi => canaleDaApi.id === canaleCorrente.id);
        const statistichePerCanale = listaChannelsStatisticsApi.find(channelsStatistic => channelsStatistic.channelId === canaleCorrente.id);
        const statusPerCanale = listaChannelStatusesApi.find(channelStatus => channelStatus.channelId === canaleCorrente.id);

        return {
            id: infoPerCanale?.id ?? "",
            name: infoPerCanale?.name ?? "",
            description: infoPerCanale?.description ?? "",
            sourceDestinationChannels: getSourceDestinationPerCanale(statusPerCanale?.childStatuses?.dashboardStatus ?? []),
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
    return listaChildren.map(childStatus => {
        const stats = childStatus.statistics.entry.reduce((acc: any, entry: any) => ({
            ...acc,
            [entry["com.mirth.connect.donkey.model.message.Status"]]: entry["long"]
        }), {});

        return {
            id: childStatus.channelId,
            name: childStatus.name,
            state: childStatus.state,
            statistics: stats
        };
    });
};

