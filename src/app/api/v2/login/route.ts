import { MIRTH_URL_V2 } from '@/services/rest.service';
import { cookies } from 'next/headers';
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

    const data = await res.text();

    const json = xml2json(data, { compact: true, })

    let response = NextResponse.json(json)

    response.cookies.set("JSESSIONID", cookieValue || "", {
        path: "/",
        secure: true,
    });

    return response;
}