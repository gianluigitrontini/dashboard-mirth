import { MIRTH_URL } from "@/services/rest.service";
import { NextResponse } from "next/server";
var xml2js = require('xml2js');


export async function GET(request: Request) {
    let res: Response = await fetch(MIRTH_URL + `channelgroups`,
        {
            method: "GET",
            headers: {
                "Cookie": request.headers.get("cookie") || "",
            },
        });

    const xml = await res.text();
    const parser = new xml2js.Parser({ explicitArray: false });
    const resultText = await parser.parseStringPromise(xml)

    return NextResponse.json(
        resultText,
        {
            status: res.status,
            statusText: res.statusText,
        }
    );
}