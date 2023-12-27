import React, { ReactNode } from "react";
import DropdownSlicer from "./DropdownSlicer";

export default function Header({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <header
      className={`${className} flex items-center justify-start bg-gray-300 rounded-md`}
    >
      {children}
    </header>
  );
}
