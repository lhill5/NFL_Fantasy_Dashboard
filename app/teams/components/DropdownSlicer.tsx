"use client";
import { useState, useMemo } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function DropdownSlicer({
  className,
  options,
  updateTeam,
}: {
  className: string;
  options: Array<string>;
  updateTeam: (team: string | null) => void;
}) {
  return (
    <Autocomplete
      className={className}
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Team" />}
      onChange={(event: any, newTeam: string | null) => {
        updateTeam(newTeam);
      }}
    />
  );
}
