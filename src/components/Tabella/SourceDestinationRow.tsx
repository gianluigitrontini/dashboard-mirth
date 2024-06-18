"use client";
import React, { memo } from "react";
import IconeStatus from "../IconeStatus";
import { SourceDestinationInterface } from "./TabellaBody";

const tdClassname =
  "px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap text-center pl-8";

const stateClassname =
  "text-neutral-400 cursor-pointer mx-auto w-2 h-2 rounded-full";
const actionClassname = "text-neutral-400 cursor-pointer mx-auto pl-6";

const SourceDestinationRow = memo(function SourceDestinationRow({
  sourceDestination,
}: {
  sourceDestination: SourceDestinationInterface;
}) {
  return (
    <tr key={sourceDestination.id}>
      {/*  Stato */}
      <td className={tdClassname}>
        {/*  Stato Check verde */}
        {sourceDestination.state == "STARTED" && (
          <div className={stateClassname + " bg-green-500"}></div>
        )}

        {sourceDestination.state == "STOPPED" && (
          <div className={stateClassname + " bg-red-500"}></div>
        )}

        {/* {sourceDestination.state == "" && (
              <div className="inline-flex items-center px-3 py-1 text-yellow-500 rounded-full gap-x-2 bg-yellow-100/60 ">
                <IconeStatus tipo="SUSPEND" />
              </div>
            )} */}
      </td>

      {/* Azioni */}
      <td>
        {sourceDestination.state == "STARTED" && (
          <div className={actionClassname}>
            <IconeStatus className="mx-auto" tipo="STOP" />
          </div>
        )}

        {sourceDestination.state == "STOPPED" && (
          <div className={actionClassname}>
            <IconeStatus className="mx-auto" tipo="START" />
          </div>
        )}
      </td>
      {/*  Nome */}
      <td className={tdClassname + " !text-left"}>{sourceDestination.name}</td>
      {/*  Ultimo deployment */}
      <td className={tdClassname}>
        {/* {sourceDestination.status.lastDeployed != "" && canale.status.lastDeployed._text} */}
      </td>
      {/*  Ricevuti */}
      <td className={tdClassname}>{sourceDestination.statistics.RECEIVED}</td>
      {/*  Filtrati */}
      <td className={tdClassname}>{sourceDestination.statistics.FILTERED}</td>
      {/*  In coda */}
      <td className={tdClassname}>{/* {sourceDestination.statistics.} */}</td>
      {/*  Inviati */}
      <td className={tdClassname}>{sourceDestination.statistics.SENT}</td>
      {/*  Errori */}
      <td className={tdClassname}>{sourceDestination.statistics.ERROR}</td>
    </tr>
  );
});

export default SourceDestinationRow;
