import { callInternalApi } from "./rest.service";

export interface GetDataPerTabellaRes {
  channels: any[];
  groups: any[];
  statistics: any[];
  statuses: any[];
  _template: any[];
}

export const getChannelGroup = async (): Promise<
  | {
      list: {
        channelGroup: any[];
      };
    }
  | {
      msg: string;
      status: string;
    }
> => {
  try {
    let response = await callInternalApi(`channelgroups`);

    if (response.ok == false) {
      throw { status: response.status, msg: response.statusText };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return { msg: error.msg, status: error.status };
  }
};

export const getDataPerTabella = async (): Promise<
  GetDataPerTabellaRes | { msg: string; status: string }
> => {
  try {
    let response = await callInternalApi("all");

    if (response.ok == false) {
      throw { status: response.status, msg: response.statusText };
    }

    const data = await response.json();
    return data;
  } catch (err: any) {
    console.log(err);
    return { msg: err.msg, status: err.status };
  }
};
