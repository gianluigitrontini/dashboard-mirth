import {
  getDataPerTabella,
  getDataPerTabellaV2,
} from "@/services/data.service";
import React, { Suspense, useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import ChannelGroupsRow from "./ChannelGroupsRow";
import ChannelsRow from "./ChannelsRow";
import SourceDestinationRow from "./SourceDestinationRow";
import { loginV2 } from "@/services/login.service";

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

const ListaChannelGroups = async () => {
  await loginV2();
  const res: any = await getDataPerTabellaV2();
  const data: any[] = res._template || [];

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

  // const [isSourceDestinationVisible, setIsSourceDestinationVisible]: [
  //   number[],
  //   any
  // ] = useState([]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   loginV2()
  //     .then(() => getDataPerTabellaV2())
  //     .then((data: any) => setData(data._template || []))
  //     .then(() => setIsLoading(false));
  // }, []);

  const handleToggleSubChannels = (i: number) => {
    // if (isSourceDestinationVisible.includes(i)) {
    //   setIsSourceDestinationVisible(
    //     isSourceDestinationVisible.filter((item) => item !== i)
    //   );
    // } else {
    //   setIsSourceDestinationVisible([...isSourceDestinationVisible, i]);
    // }
  };

  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={999}>
            <div className="mx-auto text-center">Nessun dato trovato</div>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      <Suspense
        fallback={
          <tr>
            <td colSpan={999}>
              <div className="mx-auto">
                <LoadingSpinner />
              </div>
            </td>
          </tr>
        }
      >
        {data.map((gruppo) => (
          <React.Fragment key={gruppo.id}>
            <ChannelGroupsRow gruppo={gruppo}></ChannelGroupsRow>

            {gruppo.channels.map((canale: any, i: number) => (
              <React.Fragment key={canale.id}>
                <ChannelsRow
                  canale={canale}
                  // onClick={() => handleToggleSubChannels(canale.id)}
                ></ChannelsRow>

                {canale.sourceDestinationChannels.map(
                  (sourceDestination: SourceDestinationInterface) => (
                    // isSourceDestinationVisible.includes(canale.id) && (
                    <SourceDestinationRow
                      key={sourceDestination.id + sourceDestination.name}
                      sourceDestination={sourceDestination}
                    />
                  )
                  // )
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </Suspense>
    </tbody>
  );
};

export default ListaChannelGroups;
