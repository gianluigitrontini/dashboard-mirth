import { callMirthApiV2 } from "@/services/rest.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        let statusesRes = await callMirthApiV2("statuses")

        if (statusesRes.status == 200) {
            const channelStatuses = await statusesRes.json()

            const listaChannelStatusesApi = channelStatuses.list.dashboardStatus;

            return NextResponse.json(listaChannelStatusesApi);
        }
        throw { status: statusesRes.status, msg: statusesRes.statusText };
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