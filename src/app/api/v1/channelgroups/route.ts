import { MIRTH_URL } from "@/services/rest.service";
import { NextResponse } from "next/server";
import { xml2js, xml2json } from "xml-js";

export async function GET(request: Request) {
    let res: Response = await fetch(MIRTH_URL + `channelgroups`,
        {
            method: "GET",
            headers: {
                "Cookie": request.headers.get("cookie") || "",
            },
        });

    const data = await res.text();
    const json = xml2json(data, { compact: true, })

    return NextResponse.json(
        {
            json,
            status: res.status,
            statusText: res.statusText,
        }
    );
}