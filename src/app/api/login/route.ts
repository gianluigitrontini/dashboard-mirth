import { NextResponse } from 'next/server';
import { xml2json } from 'xml-js';

export async function POST(request: Request) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    // const searchParams = new URLSearchParams(request.url.split('?')[1]);

    let res: Response = await fetch(
        'https://172.18.2.23:8443/api/users/_login?username=admin&password=admin',
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

    console.log('login', res.status);

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