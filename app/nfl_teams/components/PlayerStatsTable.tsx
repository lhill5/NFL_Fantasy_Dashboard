"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Header from "../../components/Header";
import LeftNavBar from "../../components/LeftNavBar";
import CustomTable from "../../components/CustomTable";

import { getOffensiveStats_Join_Roster } from "@/app/lib/data/NFLVerseAPI";
import { groupAndSum } from "@/app/lib/utils/helper";
import DropdownSlicer from "@/app/components/DropdownSlicer";
import { PlayerStatsHeadCell } from "@/app/lib/types/visualTypes";
import { T } from "@/app/lib/types/genericTypes";

import { iGame, iTeamRecords } from "@/app/lib/types/databaseTypes";
import styles from "./ClientPage.module.css";

const headCells: PlayerStatsHeadCell[] = [
  {
    id: "player_name",
    numeric: false,
    disablePadding: false,
    label: "Player Name",
    width: 110,
  },
  {
    id: "position",
    numeric: true,
    disablePadding: false,
    label: "position",
    width: 50,
  },
  {
    id: "season",
    numeric: true,
    disablePadding: false,
    label: "Season",
    width: 50,
  },
  {
    id: "passing_yards",
    numeric: true,
    disablePadding: false,
    label: "Passing Yards",
    width: 120,
  },
  {
    id: "passing_tds",
    numeric: true,
    disablePadding: false,
    label: "Passing TDs",
    width: 110,
  },
  {
    id: "rushing_yards",
    numeric: true,
    disablePadding: false,
    label: "Rushing Yards",
    width: 120,
  },
  {
    id: "receptions",
    numeric: true,
    disablePadding: false,
    label: "Receptions",
    width: 50,
  },
  {
    id: "targets",
    numeric: true,
    disablePadding: false,
    label: "Targets",
    width: 50,
  },
  {
    id: "receiving_yards",
    numeric: true,
    disablePadding: false,
    label: "Receiving Yards",
    width: 130,
  },
  {
    id: "receiving_tds",
    numeric: true,
    disablePadding: false,
    label: "Receiving TDs",
    width: 120,
  },
  {
    id: "receiving_epa",
    numeric: true,
    disablePadding: false,
    label: "Receiving EPA",
    width: 130,
  },
  {
    id: "fantasy_points",
    numeric: true,
    disablePadding: false,
    label: "Fantasy Points",
    width: 125,
  },
];

export default function ClientPage({ playerStats }: { playerStats: Array<T> }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const mainContainer = useRef<HTMLInputElement>(null);
  const [mainContainerHeight, setMainContainerHeight] = useState(0);
  const [mainContainerWidth, setMainContainerWidth] = useState(0);

  // if user changes team in header component, it's sent back to server to re-query new team's data
  const updateItem = (item_name: string, item: string | null) => {
    if (typeof item === "string" && item) {
      router.push(pathname + "?" + createQueryString(item_name, item));
    } else if (item === null) {
      router.push(pathname + "?" + createQueryString(item_name, ""));
    }
  };

  const updatePosition = (position: string | null) => {
    if (position)
      router.push(pathname + "?" + createQueryString("position", position));
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (mainContainer.current) {
      let parentHeight: number = mainContainer.current.offsetHeight;
      let parentWidth: number = mainContainer.current.offsetWidth;

      setMainContainerHeight(parentHeight);
      setMainContainerWidth(parentWidth);
    }
  }, [mainContainer]);

  return (
    <div className={`${styles["bg-container"]} h-full w-full items-end p-4`}>
      <main className={`${styles["client-header"]} flex flex-row w-full`}>
        <LeftNavBar className="w-1/5 m-4 mr-0">div</LeftNavBar>
        <main className="w-3/5 h-full rounded-md w-full col-span-4 border-2 border-red-900 mx-4">
          <div className="h-full grid">
            <div className="m-4 basis-full" ref={mainContainer}>
              <CustomTable
                data={playerStats}
                headCells={headCells}
                sortBy={"fantasy_points"}
                sortByDirection={"desc"}
                parentHeight={mainContainerHeight}
                parentWidth={mainContainerWidth}
              ></CustomTable>
            </div>
          </div>
        </main>
        <aside className={`${styles["fg-container"]} w-1/5 my-4 mr-4`}></aside>
      </main>
    </div>
  );
}
