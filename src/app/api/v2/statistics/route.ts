import { loginV2 } from "@/services/login.service";
import { JSESSIONID, MIRTH_URL_V2, callMirthApiV2 } from "@/services/rest.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    if (JSESSIONID === "") {
        await loginV2();
    }

    try {
        let statisticsRes = await callMirthApiV2(MIRTH_URL_V2 + "statistics")

        if (statisticsRes.status == 200) {
            const channelsStatistics = await statisticsRes.json()
            const listaChannelsStatisticsApi = channelsStatistics.list.channelStatistics;

            return new NextResponse(
                JSON.stringify(listaChannelsStatisticsApi)
            );
        }
        throw { status: statisticsRes.status, msg: statisticsRes.statusText };
    } catch (error: any) {
        return new NextResponse(
            null,
            {
                status: error.status,
                statusText: error.msg,
            }
        );
    }
}