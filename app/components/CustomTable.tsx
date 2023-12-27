"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import { T, HeadCell } from "@/app/lib/types/genericTypes";
import { styled } from "@mui/material/styles";
import { css } from "@emotion/css";
import styles from "../styles.module.css";

type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  order: Order;
  orderBy: string;
  headCells: HeadCell[];
  visibleRows: T[];
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.MuiTableCell-head`]: {
    backgroundColor: "#191919",
    color: "#ffffff !important",
  },
  [`&.MuiTableCell-body`]: {
    fontSize: 14,
    color: "#ffffff",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // when user hovers over a table body's row, highlight row
  "&.MuiTableRow-root:hover": {
    backgroundColor: "#565656",
  },

  "&:nth-of-type(even)": {
    backgroundColor: "#232323",
  },
  "&:nth-of-type(odd)": {
    backgroundColor: "#454545",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {"Roster" in props.visibleRows[0] ? (
          <StyledTableCell>Headshot</StyledTableCell>
        ) : null}
        {props.headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align="justify"
            padding={"none"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ minWidth: headCell.width }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={[
                { color: "#ffffff !important" },
                (theme) => ({
                  "&:hover": {
                    color: "#d3d3d3",
                  },
                  "&:focus": {
                    color: "#d3d3d3",
                  },
                  "&:active": {
                    color: "#d3d3d3",
                  },
                }),
              ]}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTable: React.FC<{
  data: T[];
  headCells: HeadCell[];
  sortBy: string;
  sortByDirection: Order;
  parentHeight: number;
  parentWidth: number;
}> = ({
  data,
  headCells,
  sortBy,
  sortByDirection,
  parentHeight,
  parentWidth,
}) => {
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState<Order>(sortByDirection);
  const [orderBy, setOrderBy] = React.useState<keyof T>(sortBy);
  const [rowsPerPage, setRowsPerPage] = React.useState(data.length);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const visibleRows: T[] = React.useMemo(
    () =>
      data
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .sort(getComparator(order, orderBy)),
    [data, order, orderBy, page, rowsPerPage]
  );

  return (
    <div
      style={{
        overflow: "scroll",
        margin: 0,
      }}
    >
      <Paper>
        <TableContainer sx={{ maxHeight: parentHeight, maxWidth: parentWidth }}>
          <Table stickyHeader id="player_table">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy.toString()}
              onRequestSort={handleRequestSort}
              headCells={headCells}
              visibleRows={visibleRows}
            ></EnhancedTableHead>
            <TableBody>
              {visibleRows.map((row, index) => {
                return (
                  <StyledTableRow hover key={row.id} sx={{ cursor: "pointer" }}>
                    {/* show player's headshot if in dataset (for displaying roster / player stats) */}
                    {"Roster" in row ? (
                      <StyledTableCell className="p-0 pb-1">
                        <img
                          src={row.Roster["headshot_url"]}
                          className="w-14 h-auto"
                        ></img>
                      </StyledTableCell>
                    ) : null}
                    {headCells.map((headCell) => (
                      <StyledTableCell
                        className=""
                        component="th"
                        scope="row"
                        padding="none"
                        align="justify"
                        key={headCell.id} // Adding a key to the TableCell
                      >
                        {typeof row[headCell.id] === "number"
                          ? parseFloat(row[headCell.id].toFixed(2))
                          : row[headCell.id]}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default EnhancedTable;
