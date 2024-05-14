import React from "react";
import IconeStatus from "../IconeStatus";

const SourceDestinationRow = ({
  list,
}: {
  list: {
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
}) => {
  return (
    <>
      {list.map((sourceDestination) => (
        <tr key={sourceDestination.id} className="bg-slate-50">
          {/*  Stato */}
          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
            {/*  Stato Check verde */}
            {sourceDestination.state == "STARTED" && (
              <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
                <IconeStatus tipo="STARTED" />
              </div>
            )}
            {/*  Stato X rossa */}
            {sourceDestination.state == "STOPPED" && (
              <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 ">
                <IconeStatus tipo="STOPPED" />
              </div>
            )}
            {/*  Stato sospeso giallo */}
            {sourceDestination.state == "" && (
              <div className="inline-flex items-center px-3 py-1 text-yellow-500 rounded-full gap-x-2 bg-yellow-100/60 ">
                <IconeStatus tipo="SUSPENDED" />
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
      ))}
    </>
  );
};

export default SourceDestinationRow;
