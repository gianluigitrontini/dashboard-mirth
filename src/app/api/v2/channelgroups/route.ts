import { MIRTH_URL_V2, callMirthApiV2 } from "@/services/rest.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        let channelGroupsRes = await callMirthApiV2(MIRTH_URL_V2 + "channelgroups")
        if (channelGroupsRes.status == 200) {
            const channelGroups = await channelGroupsRes.json()

            const listaChannelGroupsApi = channelGroups.list.channelGroup;

            return NextResponse.json(listaChannelGroupsApi);
        }

        throw { status: channelGroupsRes.status, msg: channelGroupsRes.statusText };
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