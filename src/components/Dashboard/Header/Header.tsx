import React from "react";
import FilterPills from "../FilterPills";

const Header = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <header
      className="bg-gray-100 grid col-span-full items-center p-2"
      style={{ gridTemplateColumns: "150px 1fr" }}
    >
      <div>OpenMirth</div>
      {!isLoading && <FilterPills />}
    </header>
  );
};

export default Header;
