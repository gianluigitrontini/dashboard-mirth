import { loginV2 } from "@/services/login.service";
import { JSESSIONID, MIRTH_URL_V2, callMirthApiV2 } from "@/services/rest.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    if (JSESSIONID === "") {
        await loginV2();
    }

    try {
        let channelsRes = await callMirthApiV2(MIRTH_URL_V2 + "channels")

        if (channelsRes.status == 200) {
            const channels = await channelsRes.json()

            const listaChannelsApi = channels.list.channel;

            return new NextResponse(
                JSON.stringify(listaChannelsApi)
            );
        }
        throw { status: channelsRes.status, msg: channelsRes.statusText };
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