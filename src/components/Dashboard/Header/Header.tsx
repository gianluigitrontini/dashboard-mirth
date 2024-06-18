import React from "react";
import FilterPills from "../FilterPills";

const Header = async ({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: any;
}) => {
  return (
    <header
      className="bg-gray-100 grid col-span-full items-center p-2"
      style={{ gridTemplateColumns: "150px 1fr" }}
    >
      <div className="tracking-wider">
        <span className="font-bold">Open</span>Mirth
      </div>

      {!isLoading && children}
    </header>
  );
};

export default Header;
