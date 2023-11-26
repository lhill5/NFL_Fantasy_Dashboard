import React from "react";
import DropdownSlicer from "./DropdownSlicer";

export default function Header({
  updateTeam,
  className,
}: {
  updateTeam: (team: string | null) => void;
  className: string;
}) {
  return (
    <header
      className={`${className} flex items-center justify-start bg-gray-300 rounded-md`}
    >
      <DropdownSlicer
        options={["TB", "LAC", "NYJ", "BUF", "KC", "JAX"]}
        className="ml-5"
        updateTeam={updateTeam}
      ></DropdownSlicer>
    </header>
  );
}
