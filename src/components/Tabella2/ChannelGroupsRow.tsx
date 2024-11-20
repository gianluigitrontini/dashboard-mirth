import { callInternalApiV2 } from "@/services/rest.service";
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
      <td colSpan={3} className="!text-left !font-medium">
        <span>{gruppo.name}</span>
      </td>

      {/* Ultimo deployment */}
      <td>{/* &mdash; */}</td>
      {/* Ricevuti */}
      <td>{/* TODO */}</td>
      {/* Filtrati */}
      <td>{/* TODO */}</td>
      {/* In coda */}
      <td>{/* TODO */}</td>
      {/* Inviati */}
      <td>{/* TODO */}</td>
      {/* Errori */}
      <td>{/* TODO */}</td>
    </tr>
  );
};

export default ChannelGroupsRow;
