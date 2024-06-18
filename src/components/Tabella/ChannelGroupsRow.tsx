"use client";
import React, { memo } from "react";
import { ChannelInterface } from "./ChannelsRow";

const tdClassname =
  "px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap text-center";

const ChannelGroupsRow = memo(function ChannelGroupsRow({
  gruppo,
}: {
  gruppo: {
    id: string;
    name: string;
    channels: ChannelInterface[];
  };
}) {
  console.log(gruppo);

  return (
    <tr className="border-t border-slate-300 bg-slate-100">
      {/* Stato */}
      {/* <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        {gruppo.name == "STARTED" && <></>}
        {gruppo.name == "STOPPED" && <></>}
        {gruppo.name == "" && <></>}
      </td> */}

      {/* Azioni */}
      {/* <td></td> */}

      {/* Nome */}
      <td colSpan={3} className={tdClassname + " !text-left !font-medium"}>
        <span>{gruppo.name}</span>
      </td>

      {/* Ultimo deployment */}
      <td className={tdClassname}>{/* &mdash; */}</td>
      {/* Ricevuti */}
      <td className={tdClassname}>{/* TODO */}</td>
      {/* Filtrati */}
      <td className={tdClassname}>{/* TODO */}</td>
      {/* In coda */}
      <td className={tdClassname}>{/* TODO */}</td>
      {/* Inviati */}
      <td className={tdClassname}>{/* TODO */}</td>
      {/* Errori */}
      <td className={tdClassname}>{/* TODO */}</td>
    </tr>
  );
});

export default ChannelGroupsRow;
