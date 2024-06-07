import { loginV2 } from "@/services/login.service";
import { JSESSIONID, MIRTH_URL_V2, callMirthApiV2 } from "@/services/rest.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    if (JSESSIONID === "") {
        await loginV2();
    }

    try {
        let statusesRes = await callMirthApiV2(MIRTH_URL_V2 + "statuses")

        if (statusesRes.status == 200) {
            const channelStatuses = await statusesRes.json()

            const listaChannelStatusesApi = channelStatuses.list.dashboardStatus;

            return NextResponse.json(listaChannelStatusesApi);
        }
        throw { status: statusesRes.status, msg: statusesRes.statusText };
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