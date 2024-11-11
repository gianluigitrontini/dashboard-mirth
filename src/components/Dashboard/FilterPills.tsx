"use client";
import { useState } from "react";

const FilterPills = () => {
  const [selected, setSelected] = useState("Canali");

  const tabs = [
    {
      name: "Canali",
    },
    {
      name: "Errori",
    },
  ];

  return (
    <div className="flex justify-center gap-4">
      {tabs.map((tab) => (
        <span
          key={tab.name}
          onClick={() => setSelected(tab.name)}
          className={`cursor-pointer border border-gray-300 hover:border-blue-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 ${
            selected == tab.name ? "bg-blue-400 border-blue-300 text-white" : ""
          }`}
        >
          {tab.name}
        </span>
      ))}
    </div>
  );
};

export default FilterPills;
