import React from "react";
import DropdownSlicer from "./DropdownSlicer";

export default function Header({
  updateTeam,
  updatePosition,
  className,
}: {
  updateTeam: (team: string | null) => void;
  updatePosition: (position: string | null) => void;
  className: string;
}) {
  return (
    <header
      className={`${className} flex items-center justify-start bg-gray-300 rounded-md`}
    >
      <DropdownSlicer
        options={["TB", "LAC", "NYJ", "BUF", "KC", "JAX"]}
        className="ml-5 w-100 h-10"
        updateItem={updateTeam}
      ></DropdownSlicer>

      <DropdownSlicer
        options={["QB", "WR", "RB", "TE"]}
        className="ml-5 w-100 h-10"
        updateItem={updatePosition}
      ></DropdownSlicer>
    </header>
  );
}
