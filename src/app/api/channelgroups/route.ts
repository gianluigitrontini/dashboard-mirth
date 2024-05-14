import { NextResponse } from "next/server";
import { xml2js, xml2json } from "xml-js";

export async function GET(request: Request) {
    let res: Response = await fetch(`https://172.18.2.23:8443/api/channelgroups`,
        {
            method: "GET",
            headers: {
                "Cookie": request.headers.get("cookie") || "",
            },
        });

    const data = await res.text();
    const json = xml2json(data, { compact: true, })

    return new NextResponse(
        json,
        {
            status: res.status,
            statusText: res.statusText,
        }
    );
}