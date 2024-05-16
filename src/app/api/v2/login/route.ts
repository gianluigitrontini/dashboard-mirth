import { MIRTH_URL_V2 } from '@/services/rest.service';
import { NextResponse } from 'next/server';
import { xml2json } from 'xml-js';

export async function POST(request: Request) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    let res: Response = await fetch(
        MIRTH_URL_V2 + 'users/_login?username=admin&password=nbs2004!',
        {
            method: "POST",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    )

    const cookieValue = res.headers.get('set-cookie')?.split('=')[1].split(';')[0] // ottiene il valore del cookie JSESSIONID
    // const cookieValue = res.headers['set-cookie']?.find(value => value.includes("JSESSIONID"))?.split('=')[1].split(';')[0] // ottiene il valore del cookie JSESSIONID

    const data = await res.text();

    const json = xml2json(data, { compact: true, })

    let response = new NextResponse(
        json,
        {
            status: res.status,
            statusText: res.statusText,
        })

    response.cookies.set({
        name: "JSESSIONID",
        value: cookieValue || "",
        path: "/",
        secure: true,
    });

    return response;
}