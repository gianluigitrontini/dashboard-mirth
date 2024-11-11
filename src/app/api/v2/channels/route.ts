import { MIRTH_URL_V2, callMirthApiV2 } from "@/services/rest.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    try {
        let channelsRes = await callMirthApiV2(MIRTH_URL_V2 + "channels")

        if (channelsRes.status == 200) {
            const channels = await channelsRes.json()

            const listaChannelsApi = channels.list.channel;

            return NextResponse.json(listaChannelsApi);
        }
        throw { status: channelsRes.status, msg: channelsRes.statusText };
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