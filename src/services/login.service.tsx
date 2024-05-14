import { BASE_URL, JSESSIONID, setToken } from "./rest.service";

export const login = async () => {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    let res = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
      },
    });

    const cookieValue = res.headers
      .get("set-cookie")
      ?.split("=")[1]
      .split(";")[0]; // ottiene il valore del cookie JSESSIONID

    if (res.ok == false) {
      throw { status: res.status, msg: res.statusText };
    }

    const data = await res.json();

    await setToken(cookieValue || "");

    return data;
  } catch (error: any) {
    console.log(error);
    return { msg: error.msg, status: error.status };
  }
};

// export const loginServer = async () => {
//   process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//   try {
//     let res: Response = await fetch(
//       "https://172.18.2.23:8443/api/users/_login?username=admin&password=admin",
//       {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           "Access-Control-Allow-Credentials": "true",
//         },
//       }
//     );

//     const cookieValue = res.headers
//       .get("set-cookie")
//       ?.split("=")[1]
//       .split(";")[0]; // ottiene il valore del cookie JSESSIONID
//     // const cookieValue = res.headers['set-cookie']?.find(value => value.includes("JSESSIONID"))?.split('=')[1].split(';')[0] // ottiene il valore del cookie JSESSIONID

//     let response = new NextResponse(res.body);

//     JSESSIONID = cookieValue || "";

//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getChannelGroupServer = async () => {
//   try {
//     let res: Response = await fetch(
//       `https://172.18.2.23:8443/api/channelgroups`,
//       {
//         method: "GET",
//         headers: {
//           Cookie: `JSESSIONID=${JSESSIONID};`,
//         },
//       }
//     );

//     const data = await res.text();
//     const json = xml2json(data, { compact: true });

//     return json;
//   } catch (error) {
//     console.log(error);
//   }
// };
