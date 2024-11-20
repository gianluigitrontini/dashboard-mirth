import { callMirthApiV2 } from "@/services/rest.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        let statisticsRes = await callMirthApiV2("statistics")

        if (statisticsRes.status == 200) {
            const channelsStatistics = await statisticsRes.json()
            const listaChannelsStatisticsApi = channelsStatistics.list.channelStatistics;

            return NextResponse.json(listaChannelsStatisticsApi);
        }
        throw { status: statisticsRes.status, msg: statisticsRes.statusText };
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