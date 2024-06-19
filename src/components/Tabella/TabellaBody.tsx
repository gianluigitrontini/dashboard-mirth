"use client";
import React, { Suspense, useCallback, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import ChannelGroupsRow from "./ChannelGroupsRow";
import ChannelsRow from "./ChannelsRow";
import SourceDestinationRow from "./SourceDestinationRow";

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

const TabellaBody = ({ data }: any) => {
  const [isSourceDestinationVisible, setIsSourceDestinationVisible]: [
    number[],
    any
  ] = useState([]);

  /**
   * Quando use-client è attivo
   */
  // const [isLoading, setIsLoading]: [boolean, any] = useState(false);

  // const [data, setData]: [
  //   {
  //     id: string;
  //     name: string;
  //     channels: any[];
  //   }[],
  //   any
  // ] = useState([]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   loginV2()
  //     .then(() => getDataPerTabellaV2())
  //     .then((data: any) => setData(data._template || []))
  //     .then(() => setIsLoading(false));
  // }, []);

  const handleSourceDestinationVisibility = (id: number) => {
    if (isSourceDestinationVisible.includes(id)) {
      setIsSourceDestinationVisible(
        isSourceDestinationVisible.filter((item) => item !== id)
      );
    } else {
      setIsSourceDestinationVisible([...isSourceDestinationVisible, id]);
    }
  };

  if (data.length === 0) {
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
      {data.map((gruppo: any) => (
        <React.Fragment key={gruppo.id}>
          <ChannelGroupsRow gruppo={gruppo}></ChannelGroupsRow>

          {gruppo.channels.map((canale: any, i: number) => (
            <React.Fragment key={canale.id}>
              <ChannelsRow
                canale={canale}
                onClick={() => handleSourceDestinationVisibility(canale.id)}
              ></ChannelsRow>

              {canale.sourceDestinationChannels.map(
                (sourceDestination: SourceDestinationInterface) =>
                  isSourceDestinationVisible.includes(canale.id) && (
                    <SourceDestinationRow
                      key={sourceDestination.id + sourceDestination.name}
                      sourceDestination={sourceDestination}
                    />
                  )
              )}
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </>
  );
};

export default TabellaBody;
