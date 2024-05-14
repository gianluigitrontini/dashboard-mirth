"use client";
import React from "react";
import SourceDestinationRow from "./SourceDestinationRow";

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

const ChannelsRow = ({ canale }: { canale: ChannelInterface }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  if (canale.status.state != "") {
    return (
      <React.Fragment key={canale.id}>
        <tr
          onClick={() => setIsVisible(!isVisible)}
          className="bg-slate-100 cursor-default"
        >
          {/* <!-- Stato --> */}
          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
            {/* <!-- Stato Check verde --> */}
            {canale.status.state == "STARTED" && (
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
            {canale.status.state == "STOPPED" && (
              <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 ">
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
            {/* <!-- Stato sospeso giallo --> */}
            {canale.status.state == "" && (
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
          <td className="px-4 py-4 text-sm text-gray-700  whitespace-nowrap">
            {canale.name}
          </td>
          {/* <!-- Ultimo deployment --> */}
          <td className="px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
            {canale.status.lastDeployed != "" &&
              canale.status.lastDeployed._text}
          </td>
          {/* <!-- Ricevuti --> */}
          <td className="px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
            {canale.statistics.received}
          </td>
          {/* <!-- Filtrati --> */}
          <td className="px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
            {canale.statistics.filtered}
          </td>
          {/* <!-- In coda --> */}
          <td className="px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
            {canale.statistics.queued}
          </td>
          {/* <!-- Inviati --> */}
          <td className="px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
            {canale.statistics.sent}
          </td>
          {/* <!-- Errori --> */}
          <td className="px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
            {canale.statistics.error}
          </td>
        </tr>

        {isVisible && (
          <SourceDestinationRow list={canale.sourceDestinationChannels} />
        )}
      </React.Fragment>
    );
  }

  if (canale.status.state == "") {
    return <></>;
  }
};

export default ChannelsRow;
