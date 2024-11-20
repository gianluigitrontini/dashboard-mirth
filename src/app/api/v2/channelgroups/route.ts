import { callMirthApiV2 } from "@/services/rest.service";
import { NextResponse } from "next/server";

export async function GET() {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

    try {
        let res = await callMirthApiV2("channelgroups")

        if (!res.ok) {
            return new NextResponse("", { status: 500 });
        }

        const channelGroups = await res.json()

        const listaChannelGroupsApi = channelGroups.list.channelGroup;

        return NextResponse.json(listaChannelGroupsApi);
    } catch (error: any) {
        console.log(error);

        return new NextResponse("", { status: 500 });
    }
}