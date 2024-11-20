import React, { useState } from "react";
import ChannelGroupsRow from "./ChannelGroupsRow";
import ChannelsRow from "./ChannelsRow";
import SourceDestinationRow from "./SourceDestinationRow";
import { callInternalApiV2 } from "@/services/rest.service";
import { ensureArray } from "@/services/utils.service";

export interface SourceDestinationInterface {
  id: string;
  name: string;
  state: string;
  statistics: {
    RECEIVED: string;
    FILTERED: string;
    SENT: string;
    ERROR: string;
  };
}

const TabellaBody = async () => {
  const res = await callInternalApiV2(`channelgroups`);

  if (!res?.ok) {
    return (
      <tr>
        <td colSpan={999}>Errore durante la richiesta</td>
      </tr>
    );
  }

  const data = await res.json();

  // const [isSourceDestinationVisible, setIsSourceDestinationVisible] = useState<
  //   any[]
  // >([]);

  // const handleSourceDestinationVisibility = (id: number) => {
  //   if (isSourceDestinationVisible.includes(id)) {
  //     setIsSourceDestinationVisible(
  //       isSourceDestinationVisible.filter((item) => item !== id)
  //     );
  //   } else {
  //     setIsSourceDestinationVisible([...isSourceDestinationVisible, id]);
  //   }
  // };

  if (data?.length === 0) {
    return (
      <tr>
        <td colSpan={999}>
          <div className="mx-auto text-center">Nessun dato trovato</div>
        </td>
      </tr>
    );
  }

  return (
    <>
      {data?.map((channelGroup: any) => (
        <React.Fragment key={channelGroup.id}>
          <ChannelGroupsRow gruppo={channelGroup}></ChannelGroupsRow>

          {ensureArray(channelGroup.channels.channel).map(
            (canale: any, i: number) => (
              <ChannelsRow key={canale.id} id={canale.id}></ChannelsRow>
            )
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default TabellaBody;
