import { MIRTH_URL } from '@/services/rest.service';
import { NextResponse } from 'next/server';
var xml2js = require('xml2js');

export async function POST(request: Request) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    let res: Response = await fetch(
        MIRTH_URL + 'users/_login?username=admin&password=admin',
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Credentials": "true",
            },
            mode: "cors",
        }
    )

    const cookieValue = res.headers.get('set-cookie')?.split('=')[1].split(';')[0] // ottiene il valore del cookie JSESSIONID

    const xml = await res.text();
    const parser = new xml2js.Parser({ explicitArray: false });
    const resultText = await parser.parseStringPromise(xml)

    let response = NextResponse.json(
        resultText,
        {
            status: res.status,
            statusText: res.statusText,
        }
    )

    response.cookies.set({
        name: "JSESSIONID",
        value: cookieValue || "",
        path: "/",
        secure: true,
    });

    return response;
}