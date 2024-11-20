"use client";
import React, { memo } from "react";
import IconeStatus from "../IconeStatus";
import { SourceDestinationInterface } from "./TabellaBody";

const stateClassname =
  "text-neutral-400 cursor-pointer mx-auto w-2 h-2 rounded-full pl-0";
const actionClassname = "text-neutral-400 cursor-pointer mx-auto pl-0";
const statisticsClassname = "pl-0";

const SourceDestinationRow = memo(function SourceDestinationRow({
  sourceDestination,
}: {
  sourceDestination: SourceDestinationInterface;
}) {
  // Fetch SourceDestination Data
  return (
    <tr key={sourceDestination.id} className="hover:bg-blue-50">
      {/*  Stato */}
      <td>
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
      <td className="!text-left !pl-8">{sourceDestination.name}</td>
      {/*  Ultimo deployment */}
      <td>
        {/* {sourceDestination.status.lastDeployed != "" && canale.status.lastDeployed._text} */}
      </td>
      {/*  Ricevuti */}
      <td>{sourceDestination.statistics.RECEIVED}</td>
      {/*  Filtrati */}
      <td>{sourceDestination.statistics.FILTERED}</td>
      {/*  In coda */}
      <td>{/* {sourceDestination.statistics.} */}</td>
      {/*  Inviati */}
      <td>{sourceDestination.statistics.SENT}</td>
      {/*  Errori */}
      <td>{sourceDestination.statistics.ERROR}</td>
    </tr>
  );
});

export default SourceDestinationRow;
