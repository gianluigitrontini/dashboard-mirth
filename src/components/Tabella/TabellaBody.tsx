"use client";
import React, { useState } from "react";
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

const TabellaBody = ({ data }: { data: any[] }) => {
  // Se fetcho i dati lato client, il cookie viene trovato correttamente. L'api funziona.
  // const { data, error, isLoading } = useDashboardTemplate();

  const [isSourceDestinationVisible, setIsSourceDestinationVisible] = useState<
    any[]
  >([]);

  const handleSourceDestinationVisibility = (id: number) => {
    if (isSourceDestinationVisible.includes(id)) {
      setIsSourceDestinationVisible(
        isSourceDestinationVisible.filter((item) => item !== id)
      );
    } else {
      setIsSourceDestinationVisible([...isSourceDestinationVisible, id]);
    }
  };

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
      {data?.map((gruppo: any) => (
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
