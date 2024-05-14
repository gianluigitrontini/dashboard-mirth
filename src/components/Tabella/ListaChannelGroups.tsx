"use client";
import React from "react";
import ChannelGroupsRow from "./ChannelGroupsRow";
import ChannelsRow, { ChannelInterface } from "./ChannelsRow";

const ListaChannelGroups = ({
  data,
}: {
  data: {
    id: string;
    name: string;
    channels: ChannelInterface[];
  }[];
}) => {
  return (
    <>
      {data.map((gruppo) => (
        <React.Fragment key={gruppo.id}>
          <ChannelGroupsRow gruppo={gruppo}></ChannelGroupsRow>

          {gruppo.channels.map((canale) => (
            <ChannelsRow canale={canale} key={canale.id}></ChannelsRow>
          ))}
        </React.Fragment>
      ))}
    </>
  );
};

export default ListaChannelGroups;
