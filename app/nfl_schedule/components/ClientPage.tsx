"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Header from "../../components/Header";
import LeftNavBar from "../../components/LeftNavBar";
import CustomTable from "../../components/CustomTable";
import DropdownSlicer from "@/app/components/DropdownSlicer";
import ScheduleList from "./ScheduleList";

import { getOffensiveStats_Join_Roster } from "@/app/lib/data/NFLVerseAPI";
import { groupAndSum } from "@/app/lib/utils/helper";
import { iGame, iTeamRecords } from "@/app/lib/types/databaseTypes";
import styles from "./ClientPage.module.css";

export default function ClientPage({
  data,
  season_list,
  week_list,
  team_list,
  team_records,
}: {
  data: Array<iGame>;
  season_list: Array<string>;
  week_list: Array<string>;
  team_list: Array<string>;
  team_records: iTeamRecords;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const mainContainer = useRef<HTMLInputElement>(null);
  const [mainContainerHeight, setMainContainerHeight] = useState(0);

  // if user changes team in header component, it's sent back to server to re-query new team's data
  const updateItem = (item_name: string, item: string | null) => {
    if (typeof item === "string" && item) {
      router.push(pathname + "?" + createQueryString(item_name, item));
    } else if (item === null) {
      router.push(pathname + "?" + createQueryString(item_name, ""));
    }
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
    <div
      className={`${styles["bg-container"]} flex flex-column items-end h-full`}
    >
      <main className={`${styles["client-header"]} flex flex-row w-full`}>
        <LeftNavBar className="w-1/5 m-4 mr-0">
          <DropdownSlicer
            options={season_list}
            className="h-10 mt-4"
            itemName="season"
            updateItem={updateItem}
          ></DropdownSlicer>

          <DropdownSlicer
            options={week_list}
            className="h-10 mt-7"
            itemName="week"
            updateItem={updateItem}
          ></DropdownSlicer>

          <DropdownSlicer
            options={team_list}
            className=" h-10 mt-7"
            itemName="team"
            updateItem={updateItem}
          ></DropdownSlicer>
        </LeftNavBar>
        <main className="w-3/5 h-full rounded-md">
          <div className="m-4" ref={mainContainer}>
            <ScheduleList
              data={data}
              team_records={team_records}
            ></ScheduleList>
          </div>
        </main>
        <aside className={`${styles["fg-container"]} w-1/5 my-4 mr-4`}></aside>
      </main>
    </div>
  );
}
