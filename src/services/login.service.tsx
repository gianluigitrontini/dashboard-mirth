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

export const loginV2 = async () => {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    let res = await fetch(`${BASE_URL}/api/v2/login`, {
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
