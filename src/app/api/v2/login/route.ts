import { MIRTH_URL_V2 } from '@/services/rest.service';
import { NextResponse } from 'next/server';
import { xml2json } from 'xml-js';

export async function POST(request: Request) {
    const req = await request.json();

    try {
        let res: Response = await fetch(
            MIRTH_URL_V2 + `users/_login?username=${req.name}&password=${req.password}`,
            {
                method: "POST",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
        const data = await res.text();

        const json = xml2json(data, { compact: true, })

        let response = new NextResponse(json)

        response.headers.set('set-cookie', res.headers.getSetCookie()[0])

        return response;
    } catch (error) {
        console.log(error)
    }

}