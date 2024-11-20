import React from "react";
import IconeStatus from "../IconeStatus";
import SourceDestinationRow from "./SourceDestinationRow";
import { callInternalApiV2 } from "@/services/rest.service";

export interface ChannelRowProps extends React.ComponentPropsWithoutRef<"tr"> {
  canale: ChannelInterface;
}

export interface ChannelInterface {
  description: string;
  id: string;
  name: string;
  sourceDestinationChannels: {
    id: string;
    name: string;
    state: string;
    statistics: {
      RECEIVED: string;
      FILTERED: string;
      SENT: string;
      ERROR: string;
    };
  }[];
  statistics: {
    received: string;
    sent: string;
    error: string;
    filtered: string;
    queued: string;
  };
  status: { state: string; lastDeployed: string & { _text: string } };
}

const stateClassname =
  "border-2 border-transparent mx-auto w-3 h-3 rounded-full animate-pulse";

const ChannelsRow = async ({ id }: { id: string }) => {
  const resChannel = await callInternalApiV2(`channels/${id}`);
  if (!resChannel?.ok) {
    return (
      <tr>
        <td colSpan={999}>Errore durante la richiesta</td>
      </tr>
    );
  }
  const canale = await resChannel.json();

  const resStatus = await callInternalApiV2(`channels/${id}/status`);
  let status;
  if (resStatus?.ok) {
    status = await resStatus.json();
  }

  const resStatistics = await callInternalApiV2(`channels/${id}/statistics`);
  let statistics;
  if (resStatistics?.ok) {
    statistics = await resStatistics.json();
  }

  // console.log("status", status);
  // console.log("statistics", statistics);

  // if (canale.status.state == "") {
  //   return <></>;
  // }

  if (status?.state != "") {
    return (
      <>
        <tr className="bg-slate-50 cursor-default hover:bg-blue-50">
          <td>
            {status?.state == "STARTED" && (
              <div className={stateClassname + " !bg-green-500"}></div>
            )}

            {status?.state == "STOPPED" && (
              <div className={stateClassname + " !border-neutral-300"}></div>
            )}
          </td>

          <td>
            {status?.state == "STARTED" && (
              <div className="text-neutral-400 cursor-pointer mx-auto">
                <IconeStatus className="mx-auto" tipo="STOP" />
              </div>
            )}

            {status?.state == "STOPPED" && (
              <div className="text-neutral-400 cursor-pointer mx-auto">
                <IconeStatus className="mx-auto" tipo="START" />
              </div>
            )}

            {status?.state == "" && (
              <div className="text-neutral-400 cursor-pointer mx-auto">
                <IconeStatus className="mx-auto" tipo="SUSPEND" />
              </div>
            )}
          </td>

          <td className="!text-left">{canale.name}</td>

          <td>{/* {status.lastDeployed != "" && status.lastDeployed} */}</td>
          <td>{statistics.received}</td>
          <td>{statistics.filtered}</td>
          <td>{statistics.queued}</td>
          <td>{statistics.sent}</td>
          <td>{statistics.error}</td>
        </tr>

        {/* <SourceDestinationRow
        key={sourceDestination.id + sourceDestination.name}
        sourceDestination={sourceDestination}
      /> */}
      </>
    );
  } else {
    console.log(status);
    return <></>;
  }
};

export default ChannelsRow;
