import React from "react";
import { ChannelInterface } from "./ChannelsRow";

const ChannelGroupsRow = async ({
  gruppo,
}: {
  gruppo: {
    id: string;
    name: string;
    channels: ChannelInterface[];
  };
}) => {
  return (
    <tr className="border-t border-slate-300 bg-slate-100">
      {/* Stato */}
      {/* <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        {gruppo.name == "STARTED" && <></>}
        {gruppo.name == "STOPPED" && <></>}
        {gruppo.name == "" && <></>}
      </td> */}

      {/* Azioni */}
      <td></td>

      {/* Nome */}
      <td
        colSpan={2}
        className="px-4 py-4 text-sm font-medium text-gray-700  whitespace-nowrap"
      >
        {/* <div className="inline-flex items-center gap-x-3"> */}
        {/* <input type="checkbox" className="text-blue-500 border-gray-300 rounded">  */}
        <span>{gruppo.name}</span>
        {/* </div>  */}
      </td>

      {/* Ultimo deployment */}
      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
        &mdash;
      </td>
      {/* Ricevuti */}
      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
        {/* TODO */}
      </td>
      {/* Filtrati */}
      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
        {/* TODO */}
      </td>
      {/* In coda */}
      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
        {/* TODO */}
      </td>
      {/* Inviati */}
      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
        {/* TODO */}
      </td>
      {/* Errori */}
      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
        {/* TODO */}
      </td>
    </tr>
  );
};

export default ChannelGroupsRow;
