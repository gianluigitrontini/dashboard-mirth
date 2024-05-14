"use client";
import { getChannelGroup, login } from "@/services/login.service";
import { useEffect } from "react";

const ListaCanali = ({ canale }: any) => {
  return (
    <>
      <tr className="hover:bg-slate-50">
        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          {/* <!-- Stato Check verde --> */}
          {canale?.status?.state == "STARTED" && (
            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
          {/* <!-- Stato X rossa --> */}
          {/* <!-- <div
                                className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 ">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5"
                                        strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                            </div> --> */}
          {/* <!-- Stato sospeso giallo --> */}
          {canale.status.state != "STARTED" && (
            <div className="inline-flex items-center px-3 py-1 text-yellow-500 rounded-full gap-x-2 bg-yellow-100/60 ">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 3L3 9M3 3L9 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </td>

        {/* <!-- Nome --> */}
        <td className="px-4 py-4 text-sm font-light text-gray-700  whitespace-nowrap">
          {/* <div className="inline-flex items-center gap-x-3"> 
                                 <input type="checkbox" className="text-blue-500 border-gray-300 rounded  ">  */}
          <span>{canale.name}</span>
          {/* </div> */}
        </td>

        {/* <!-- Ultimo deployment --> */}
        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
          {/* <!-- {{canale.status.lastDeployed.time}} --> */}
        </td>
        {/* <!-- Ricevuti --> */}
        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
          {canale.statistics.received}
        </td>
        {/* <!-- Filtrati --> */}
        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
          {canale.statistics.filtered}
        </td>
        {/* <!-- In coda --> */}
        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
          {canale.statistics.queued}
        </td>
        {/* <!-- Inviati --> */}
        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
          {canale.statistics.sent}
        </td>
        {/* <!-- Errori --> */}
        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
          {canale.statistics.error}
        </td>
      </tr>
    </>
  );
};

export default ListaCanali;
