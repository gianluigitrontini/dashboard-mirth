import React, { Suspense } from "react";
import LoadingSpinner from "../LoadingSpinner";
import ChannelGroupsRow from "./ChannelGroupsRow";
import ChannelsRow from "./ChannelsRow";

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

const TabellaDataList = async ({ data }: any) => {
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
      {data.map((gruppo: any) => (
        <React.Fragment key={gruppo.id}>
          <ChannelGroupsRow gruppo={gruppo}></ChannelGroupsRow>

          {gruppo.channels.map((canale: any, i: number) => (
            <ChannelsRow key={canale.id} canale={canale}></ChannelsRow>
          ))}
        </React.Fragment>
      ))}
    </Suspense>
  );
};

export default TabellaDataList;
