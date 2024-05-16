import { loginV2 } from "@/services/login.service";
import { JSESSIONID, MIRTH_URL_V2, callMirthApiV2 } from "@/services/rest.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    if (JSESSIONID === "") {
        await loginV2();
    }

    try {
        let channelGroupsRes = await callMirthApiV2(MIRTH_URL_V2 + "channelgroups")
        if (channelGroupsRes.status == 200) {
            const channelGroups = await channelGroupsRes.json()

            const listaChannelGroupsApi = channelGroups.list.channelGroup;

            return new NextResponse(
                JSON.stringify(listaChannelGroupsApi)
            );
        }

        throw { status: channelGroupsRes.status, msg: channelGroupsRes.statusText };
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