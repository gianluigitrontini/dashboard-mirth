"use client";
import React, { memo, useState } from "react";
import IconeStatus from "../IconeStatus";
import SourceDestinationRow from "./SourceDestinationRow";
import { SourceDestinationInterface } from "./TabellaBody";

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

const ChannelsRow = memo(function ChannelsRow({
  canale,
  ...props
}: ChannelRowProps) {
  if (canale.status.state == "") {
    return <></>;
  }

  if (canale.status.state != "") {
    return (
      <tr {...props} className="bg-slate-50 cursor-default hover:bg-blue-50">
        {/* Stato */}
        <td>
          {canale.status.state == "STARTED" && (
            <div className={stateClassname + " !bg-green-500"}></div>
          )}
          {canale.status.state == "STOPPED" && (
            <div className={stateClassname + " !border-neutral-300"}></div>
          )}
        </td>

        {/* Azioni */}
        <td>
          {canale.status.state == "STARTED" && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="text-neutral-400 cursor-pointer mx-auto"
            >
              <IconeStatus className="mx-auto" tipo="STOP" />
            </div>
          )}

          {canale.status.state == "STOPPED" && (
            <div
              onClick={(e) => e.stopPropagation()}
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
        <td className="!text-left">{canale.name}</td>

        {/* Ultimo deployment */}
        <td>
          {canale.status.lastDeployed != "" && canale.status.lastDeployed._text}
        </td>
        {/* Ricevuti */}
        <td>{canale.statistics.received}</td>
        {/* Filtrati */}
        <td>{canale.statistics.filtered}</td>
        {/* In coda */}
        <td>{canale.statistics.queued}</td>
        {/* Inviati */}
        <td>{canale.statistics.sent}</td>
        {/* Errori */}
        <td>{canale.statistics.error}</td>
      </tr>
    );
  }
});

export default ChannelsRow;
