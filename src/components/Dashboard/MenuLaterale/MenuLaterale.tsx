"use client";
import { useRouter } from "next/navigation";
import React from "react";

const MenuLaterale = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-100 p-2 flex flex-col gap-4">
      <button
        onClick={() => router.refresh()}
        className="flex items-center gap-2 text-sm cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>

        <span>Ricarica</span>
      </button>
    </div>
  );
};

export default MenuLaterale;
