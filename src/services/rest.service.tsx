import { cookies } from "next/headers";

// export const BASE_URL = "https://172.18.3.226:3000";
export const BASE_URL = "https://localhost:3000";

export const MIRTH_URL = "https://172.18.2.23:8443/api";
export const MIRTH_URL_V2 = "https://172.18.2.28:8443/api";

/**
 * API V1
 * @param endpoint
 */
export const callInternalApi = async (
  endpoint: "all" | "channelgroups"
): Promise<any> => {
  const cookieStore = await cookies();

  try {
    return fetch(`${BASE_URL}/api/${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
    });
  } catch (error) {
    console.log(error);
  }
};

export const callMirthApi = async (
  url: string,
  { request }: { request: any }
): Promise<any> => {
  const cookieStore = await cookies();
  const JSESSIONID = cookieStore.get("JSESSIONID")?.value;

  try {
    return fetch(url, {
      method: "GET",
      headers: {
        Cookie: `JSESSIONID=${JSESSIONID};`,
      },
      cache: "no-cache",
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * API V2
 * @param endpoint
 */
export const callInternalApiV2 = async (endpoint: string): Promise<any> => {
  const cookieStore = await cookies();

  return fetch(`${BASE_URL}/api/v2/${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Cookie: cookieStore.toString(),
    },
    cache: "no-cache",
    credentials: "include",
  });
};

export const callMirthApiV2 = async (endpoint: string): Promise<any> => {
  const cookieStore = await cookies();

  return fetch(`${MIRTH_URL_V2}/${endpoint}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Cookie: cookieStore.toString(),
      "X-Requested-With": "XMLHttpRequest",
    },
    cache: "no-cache",
  });
};
