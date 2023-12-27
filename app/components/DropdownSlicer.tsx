"use client";

import { useState, useMemo } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)({
  "& label": {
    color: "#FFFFFF",
  },
  "& label.Mui-focused": {
    color: "#FFFFFF",
  },
  "& label.Mui-checked": {
    color: "#FFFFFF",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#FFFFFF",
    },
  },
});

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default function DropdownSlicer({
  className,
  options,
  itemName,
  updateItem,
}: {
  className: string;
  options: Array<string>;
  itemName: string;
  updateItem: (itemName: string, newItem: string | null) => void;
}) {
  return (
    <Autocomplete
      className={`${className} flex flex-column justify-center items-center mx-4 my-8 `}
      disablePortal
      id="combo-box-demo"
      options={options}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          label={capitalize(itemName)}
          className=""
        />
      )}
      onChange={(event: any, newItem: string | null) => {
        updateItem(itemName, newItem);
      }}
    />
  );
}
