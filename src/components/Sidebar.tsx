"use client";

import React from "react";
import Logo from "../asset/svg/smallLogo.svg";
interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar = ({ sidebarOpen }: SidebarProps) => {
  return (
    <aside
      className={`absolute left-0 top-0 z-[20000] flex h-screen w-[13rem] flex-col overflow-y-hidden border-r border-stroke bg-white  lg:static lg:translate-x-0 ${
        sidebarOpen
          ? "translate-x-0 duration-300 ease-linear"
          : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-4 py-[2rem] lg:py-6.5 xl:py-10">
      <a href="/customer" className="flex justify-center w-full">
            <img
              src={Logo}
              alt="logo-svg"
              className="~size-[3.2rem]/[3rem]"
            />
          </a>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <div className="mt-1 px-4 lg:px-6">
          <div></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
