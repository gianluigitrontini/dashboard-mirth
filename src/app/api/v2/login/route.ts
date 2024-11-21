import { MIRTH_URL_V2 } from '@/services/rest.service';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
var xml2js = require('xml2js');

// Questa funzione, comunica con il backend. Alla fine, reinvia il token all'authAction.
export async function POST(request: Request) {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

    const req = await request.json();

    try {
        let res: Response = await fetch(
            MIRTH_URL_V2 + `/users/_login?username=${req.name}&password=${req.password}`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
        const result = await res.json();

        console.log(result)

        // Posso settare il cookie o qui:
        const cookieValue = res.headers.getSetCookie()[0].match(/(?<=JSESSIONID=)([^;]+)/) || "";
        const cookieStore = await cookies();
        cookieStore.set({
            name: "JSESSIONID",
            value: cookieValue[0],
            secure: true,
            httpOnly: true,
            path: "/",
        });

        // oppure posso settare il cookie in NextResponse.json, tramite l'header "Set-Cookie":
        return NextResponse.json(result)
    } catch (error) {
        return new NextResponse("", { status: 500 })
    }

}