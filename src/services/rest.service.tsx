export const BASE_URL = "https://172.18.3.226:3000";
// export const BASE_URL = "https://localhost:3000";

export let JSESSIONID = "";

export const callInternalApi = async (endpoint: string): Promise<any> => {
  try {
    return fetch(`${BASE_URL}/api/${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        Cookie: `JSESSIONID=${JSESSIONID};`,
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

export const setToken = (token: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    JSESSIONID = token;

    resolve(JSESSIONID);
  });
};

export const getToken = (): string => {
  return JSESSIONID;
};
