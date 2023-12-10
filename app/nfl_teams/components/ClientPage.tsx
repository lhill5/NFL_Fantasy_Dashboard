"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Header from "../../components/Header";
import LeftNavBar from "../../components/LeftNavBar";
import CustomTable from "../../components/CustomTable";

import { getOffensiveStats_Join_Roster } from "@/app/lib/data/NFLVerseAPI";
import groupAndSum from "@/app/lib/utils/helper";
import { PlayerStatsHeadCell } from "@/app/lib/types/visualTypes";
import { T } from "@/app/lib/types/genericTypes";

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

  // if user changes team in header component, it's sent back to server to re-query new team's data
  const updateTeam = (team: string | null) => {
    if (team) router.push(pathname + "?" + createQueryString("team", team));
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
    }
  }, [mainContainer]);

  return (
    <div className=" w-full h-full grid grid-cols-6 gap-4 bg-gray-800 p-4">
      <LeftNavBar className="col-span-1"></LeftNavBar>
      <main className="w-full h-full col-span-4 rounded-md">
        <div
          className="h-full flex flex-col border-2 border-red-900"
          ref={mainContainer}
        >
          <Header
            updateTeam={updateTeam}
            updatePosition={updatePosition}
            className="grow basis-2/12 m-4 bg-gray-300"
          ></Header>
          <div className="grow basis-8/12 m-4 bg-gray-300">
            <CustomTable
              data={playerStats}
              headCells={headCells}
              sortBy={"fantasy_points"}
              sortByDirection={"desc"}
              parentHeight={mainContainerHeight}
            ></CustomTable>
          </div>
          <footer className="grow basis-2/12 m-4 bg-gray-300 ">footer</footer>
        </div>
      </main>
      <aside className="col-span-1 bg-gray-300 rounded-md border-2">
        sidebar
      </aside>
    </div>
  );
}
