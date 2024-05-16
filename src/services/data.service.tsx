import { callInternalApi, callInternalApiV2 } from "./rest.service";

export interface GetDataPerTabellaRes {
  channels: any[];
  groups: any[];
  statistics: any[];
  statuses: any[];
  _template: any[];
}

// export const getChannelGroup = async (): Promise<
//   | {
//       list: {
//         channelGroup: any[];
//       };
//     }
//   | {
//       msg: string;
//       status: string;
//     }
// > => {
//   try {
//     let response = await callInternalApi(`channelgroups`);

//     if (response.ok == false) {
//       throw { status: response.status, msg: response.statusText };
//     }

//     const data = await response.json();
//     return data;
//   } catch (error: any) {
//     return { msg: error.msg, status: error.status };
//   }
// };

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

// Dati per API v2 formato json
export const getDataV2 = async (
  endpoint: "all" | "channelgroups" | "channels" | "statistics" | "statuses"
): Promise<GetDataPerTabellaRes | { msg: string; status: string }> => {
  try {
    let response = await callInternalApiV2(endpoint);

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

export const getDataPerTabellaV2 = async (): Promise<
  GetDataPerTabellaRes | { msg: string; status: string }
> => {
  try {
    let response = await callInternalApiV2("all");

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

export const getChannelGroupsV2 = async (): Promise<
  GetDataPerTabellaRes | { msg: string; status: string }
> => {
  try {
    let response = await callInternalApiV2("channelgroups");

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
export const getChannelsV2 = async (): Promise<
  GetDataPerTabellaRes | { msg: string; status: string }
> => {
  try {
    let response = await callInternalApiV2("channels");

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
export const getStatisticsV2 = async (): Promise<
  GetDataPerTabellaRes | { msg: string; status: string }
> => {
  try {
    let response = await callInternalApiV2("statistics");

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
export const getStatusesV2 = async (): Promise<
  GetDataPerTabellaRes | { msg: string; status: string }
> => {
  try {
    let response = await callInternalApiV2("statuses");

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
