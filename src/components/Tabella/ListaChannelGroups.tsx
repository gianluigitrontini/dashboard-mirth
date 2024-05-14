"use client";
import React, { useEffect, useState } from "react";
import ChannelGroupsRow from "./ChannelGroupsRow";
import ChannelsRow, { ChannelInterface } from "./ChannelsRow";
import { getDataPerTabella } from "@/services/data.service";
import LoadingSpinner from "../LoadingSpinner";
import SourceDestinationRow from "./SourceDestinationRow";

const ListaChannelGroups = () => {
  const [data, setData]: [
    {
      id: string;
      name: string;
      channels: any[];
    }[],
    any
  ] = useState([]);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const dataTabella = await getDataPerTabella();

      console.log(dataTabella);

      if (dataTabella) {
        //@ts-ignore
        setData(dataTabella._template);
      }
      setIsLoading(false);
    })();
  }, []);

  const [isLoading, setIsLoading]: [boolean, any] = useState(false);
  const [isVisible, setIsVisible]: [number[], any] = useState([]);

  const handleToggleSubChannels = (i: number) => {
    if (isVisible.includes(i)) {
      setIsVisible(isVisible.filter((item) => item !== i));
    } else {
      setIsVisible([...isVisible, i]);
    }
  };

  return (
    <tbody>
      {isLoading && (
        <tr>
          <td colSpan={999}>
            <div className="mx-auto">
              <LoadingSpinner />
            </div>
          </td>
        </tr>
      )}

      {data.map((gruppo) => (
        <React.Fragment key={gruppo.id}>
          <ChannelGroupsRow gruppo={gruppo}></ChannelGroupsRow>

          {gruppo.channels.map((canale, i) => (
            <>
              <ChannelsRow
                canale={canale}
                key={canale.id}
                onClick={() => handleToggleSubChannels(canale.id)}
              ></ChannelsRow>

              {canale.sourceDestinationChannels.map(
                (sourceDestination: {
                  id: string;
                  name: string;
                  state: string;
                  statistics: {
                    RECEIVED: string;
                    FILTERED: string;
                    SENT: string;
                    ERROR: string;
                  };
                }) =>
                  isVisible.includes(canale.id) && (
                    <SourceDestinationRow
                      key={sourceDestination.id + sourceDestination.name}
                      sourceDestination={sourceDestination}
                    />
                  )
              )}
            </>
          ))}
        </React.Fragment>
      ))}
    </tbody>
  );
};

export default ListaChannelGroups;
