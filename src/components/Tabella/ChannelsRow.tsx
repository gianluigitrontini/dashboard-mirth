import React from "react";
import IconeStatus from "../IconeStatus";

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

const ChannelsRow = async ({ canale, ...rest }: ChannelRowProps) => {
  if (canale.status.state != "") {
    return (
      <tr className="bg-slate-50 cursor-default" {...rest}>
        {/* Stato */}
        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          {canale.status.state == "STARTED" && (
            <div className="mx-auto w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          )}
          {canale.status.state == "STOPPED" && (
            <div className="mx-auto w-3 h-3 border-2 border-neutral-300 rounded-full"></div>
          )}
        </td>

        {/* Azioni */}
        <td>
          {canale.status.state == "STARTED" && (
            <div
              // onClick={(e) => e.stopPropagation()}
              className="text-neutral-400 cursor-pointer mx-auto"
            >
              <IconeStatus className="mx-auto" tipo="STOP" />
            </div>
          )}

          {canale.status.state == "STOPPED" && (
            <div
              // onClick={(e) => e.stopPropagation()}
              className="text-neutral-400 cursor-pointer mx-auto"
            >
              <IconeStatus className="mx-auto" tipo="START" />
            </div>
          )}

          {canale.status.state == "" && (
            <div className="text-neutral-400 cursor-pointer mx-auto">
              <IconeStatus className="mx-auto" tipo="SUSPEND" />
            </div>
          )}
        </td>

        {/* Nome */}
        <td className="px-4 py-4 text-sm text-gray-700  whitespace-nowrap">
          {canale.name}
        </td>
        {/* Ultimo deployment */}
        <td className="px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
          {canale.status.lastDeployed != "" && canale.status.lastDeployed._text}
        </td>
        {/* Ricevuti */}
        <td className="px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
          {canale.statistics.received}
        </td>
        {/* Filtrati */}
        <td className="px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
          {canale.statistics.filtered}
        </td>
        {/* In coda */}
        <td className="px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
          {canale.statistics.queued}
        </td>
        {/* Inviati */}
        <td className="px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
          {canale.statistics.sent}
        </td>
        {/* Errori */}
        <td className="px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
          {canale.statistics.error}
        </td>
      </tr>
    );
  }

  if (canale.status.state == "") {
    return <></>;
  }
};

export default ChannelsRow;
