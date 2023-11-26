"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import { T, HeadCell } from "@/app/lib/types/genericTypes";
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
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell>Headshot</TableCell>
        {props.headCells.map((headCell) => (
          <TableCell
            className="w-60"
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTable: React.FC<{
  data: T[];
  headCells: HeadCell[];
  parentHeight: number;
}> = ({ data, headCells, parentHeight }) => {
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof T>("calories");
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
        width: "100%",
        height: "100%",
        overflow: "scroll",
      }}
      className="border-2 border-blue-800"
    >
      <Paper>
        <TableContainer sx={{ maxHeight: parentHeight * 0.35 }}>
          <Table stickyHeader aria-label="sticky table" id="player_table">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy.toString()}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody className={styles["td"]}>
              {visibleRows.map((row, index) => {
                return (
                  <TableRow hover key={row.id} sx={{ cursor: "pointer" }}>
                    <TableCell className="">
                      <img
                        src={row.Roster["headshot_url"]}
                        className="w-16 h-auto"
                      ></img>
                    </TableCell>
                    {headCells.map((headCell) => (
                      <TableCell
                        className=""
                        component="th"
                        scope="row"
                        padding="normal"
                        align={headCell.id === "full_name" ? "left" : "right"}
                        key={headCell.id} // Adding a key to the TableCell
                      >
                        {typeof row[headCell.id] === "number"
                          ? parseFloat(row[headCell.id].toFixed(2))
                          : row[headCell.id]}
                      </TableCell>
                    ))}
                  </TableRow>
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
