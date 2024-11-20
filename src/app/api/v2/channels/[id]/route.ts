import { callMirthApiV2 } from "@/services/rest.service";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const channelId = (await params).id // 'a', 'b', or 'c'

    try {
        let res = await callMirthApiV2("channels/" + channelId);

        if (!res.ok) {
            return new NextResponse("", { status: 500 });
        }
        const channel = await res.json()

        const listaChannelsApi = channel.channel;

        return NextResponse.json(listaChannelsApi);
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