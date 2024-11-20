import { callMirthApiV2 } from "@/services/rest.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        let channelGroupsRes = await callMirthApiV2("channelgroups")

        if (!channelGroupsRes.ok) {
            return new NextResponse("", { status: 500 });
        }

        const channelGroups = await channelGroupsRes.json()

        const listaChannelGroupsApi = channelGroups.list.channelGroup;

        return NextResponse.json(listaChannelGroupsApi);
    } catch (error: any) {
        return new NextResponse("", { status: 500 });
    }
}