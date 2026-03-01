"use client"
import { usePathname } from "next/navigation";
import React, { JSX } from 'react'

interface Props {
    path: string;
    icon: JSX.Element;
    title: string;
    subTitle: string;
}
export const SidebarItem = ({
  path,
  title,
  icon: Icon,
}: Props) => {
  const pathName = usePathname();
  return (
    <li>
      <a
        href={path}
        className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl
          ${pathName === path ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400" : ""}`}
      >
        {Icon}
        <span className="-mr-1 font-medium">{title}</span>
      </a>
    </li>
  );
};
