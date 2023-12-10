"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Header from "../../components/Header";
import LeftNavBar from "../../components/LeftNavBar";
import CustomTable from "../../components/CustomTable";

import { getOffensiveStats_Join_Roster } from "@/app/lib/data/NFLVerseAPI";
import groupAndSum from "@/app/lib/utils/helper";
import { ScheduleHeadCell } from "@/app/lib/types/visualTypes";
import { iSchedule } from "@/app/lib/types/databaseTypes";

const headCells: ScheduleHeadCell[] = [
  {
    id: "season",
    numeric: false,
    disablePadding: false,
    label: "Season",
    width: 110,
  },
  {
    id: "week",
    numeric: false,
    disablePadding: false,
    label: "Week",
    width: 50,
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date",
    width: 50,
  },
  {
    id: "home_team",
    numeric: false,
    disablePadding: false,
    label: "Home Team",
    width: 120,
  },
  {
    id: "home_score_total",
    numeric: true,
    disablePadding: false,
    label: "Home Team Final Score",
    width: 110,
  },
  {
    id: "away_team",
    numeric: false,
    disablePadding: false,
    label: "Away Team",
    width: 120,
  },
  {
    id: "away_score_total",
    numeric: true,
    disablePadding: false,
    label: "Away Team Final Score",
    width: 50,
  },
];

export default function ClientPage({ data }: { data: Array<iSchedule> }) {
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
              data={data}
              headCells={headCells}
              sortBy={"week"}
              sortByDirection={"asc"}
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
