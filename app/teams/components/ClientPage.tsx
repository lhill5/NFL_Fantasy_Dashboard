"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { getOffensiveStats_Join_Roster } from "@/app/lib/data/dbAPI";
import LeftSidebar from "./LeftSidebar";
import { PlayerStatsHeadCell } from "@/app/lib/types/visualTypes";

import CustomTable from "./CustomTable";
import groupAndSum from "@/app/lib/utils/helper";
import Header from "./Header";
import { T } from "@/app/lib/types/genericTypes";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const headCells: PlayerStatsHeadCell[] = [
  {
    id: "player_name",
    numeric: false,
    disablePadding: false,
    label: "Player Name",
  },
  {
    id: "position",
    numeric: true,
    disablePadding: false,
    label: "position",
  },
  {
    id: "season",
    numeric: true,
    disablePadding: false,
    label: "Season",
  },
  {
    id: "passing_yards",
    numeric: true,
    disablePadding: false,
    label: "Passing Yards",
  },
  {
    id: "passing_tds",
    numeric: true,
    disablePadding: false,
    label: "Passing TDs",
  },
  {
    id: "rushing_yards",
    numeric: true,
    disablePadding: false,
    label: "Rushing Yards",
  },
  {
    id: "receptions",
    numeric: true,
    disablePadding: false,
    label: "Receptions",
  },
  {
    id: "targets",
    numeric: true,
    disablePadding: false,
    label: "Targets",
  },
  {
    id: "receiving_yards",
    numeric: true,
    disablePadding: false,
    label: "Receiving Yards",
  },
  {
    id: "receiving_tds",
    numeric: true,
    disablePadding: false,
    label: "Receiving TDs",
  },
  {
    id: "receiving_epa",
    numeric: true,
    disablePadding: false,
    label: "Receiving EPA",
  },
  {
    id: "fantasy_points",
    numeric: true,
    disablePadding: false,
    label: "Fantasy Points",
  },
];

export default function ClientPage({ playerStats }: { playerStats: Array<T> }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const mainContainer = useRef<HTMLInputElement>(null);
  const [mainContainerHeight, setMainContainerHeight] = useState(0);

  // if user changes team in header component, it's sent back to server to re-query new team's data
  const updateTeam = (team: string | null) => {
    if (team) router.push(pathname + "?" + createQueryString("team", team));
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
    }
  }, [mainContainer]);

  return (
    // <CustomTable data={playerStats} headCells={headCells}></CustomTable>

    <div className=" w-full h-full grid grid-cols-6 gap-4 bg-gray-800 p-4">
      <LeftSidebar className="col-span-1"></LeftSidebar>
      <main className="w-full h-full col-span-4 rounded-md">
        <div
          className="h-full flex flex-col border-2 border-red-900"
          ref={mainContainer}
        >
          <Header
            updateTeam={updateTeam}
            className="grow basis-2/12 m-4 bg-gray-300"
          ></Header>
          <div className="grow basis-4/12 m-4 bg-gray-300 ">
            <CustomTable
              data={playerStats}
              headCells={headCells}
              parentHeight={mainContainerHeight}
            ></CustomTable>
          </div>
          <footer className="grow basis-4/12 m-4 bg-gray-300 ">footer</footer>
        </div>
      </main>
      <aside className="col-span-1 bg-gray-300 rounded-md border-2">
        sidebar
      </aside>
    </div>
  );
}
