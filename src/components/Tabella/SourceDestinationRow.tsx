import React from "react";
import IconeStatus from "../IconeStatus";

const SourceDestinationRow = ({
  sourceDestination,
}: {
  sourceDestination: {
    id: string;
    name: string;
    state: string;
    statistics: {
      RECEIVED: string;
      FILTERED: string;
      SENT: string;
      ERROR: string;
    };
  };
}) => {
  return (
    <>
      <tr key={sourceDestination.id}>
        {/*  Stato */}
        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          {/*  Stato Check verde */}
          {sourceDestination.state == "STARTED" && (
            <div className="mx-auto w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          )}

          {sourceDestination.state == "STOPPED" && (
            <div className="mx-auto w-3s h-3s bg-red-500 rounded-full"></div>
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
            <div className="text-neutral-400 cursor-pointer mx-auto">
              <IconeStatus className="mx-auto" tipo="STOP" />
            </div>
          )}

          {sourceDestination.state == "STOPPED" && (
            <div className="text-neutral-400 cursor-pointer mx-auto">
              <IconeStatus className="mx-auto" tipo="START" />
            </div>
          )}
        </td>
        {/*  Nome */}
        <td className="px-4 py-4 text-sm text-gray-700  whitespace-nowrap">
          {sourceDestination.name}
        </td>
        {/*  Ultimo deployment */}
        <td className="px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
          {/* {sourceDestination.status.lastDeployed != "" && canale.status.lastDeployed._text} */}
        </td>
        {/*  Ricevuti */}
        <td className="px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
          {sourceDestination.statistics.RECEIVED}
        </td>
        {/*  Filtrati */}
        <td className="px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
          {sourceDestination.statistics.FILTERED}
        </td>
        {/*  In coda */}
        <td className="px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
          {/* {sourceDestination.statistics.} */}
        </td>
        {/*  Inviati */}
        <td className="px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
          {sourceDestination.statistics.SENT}
        </td>
        {/*  Errori */}
        <td className="px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
          {sourceDestination.statistics.ERROR}
        </td>
      </tr>
    </>
  );
};

export default SourceDestinationRow;
