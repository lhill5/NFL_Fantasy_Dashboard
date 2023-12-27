import React from "react";
import { useState, useEffect } from "react";
import { getTeamLogo } from "@/app/lib/data/filebase";
import { iGame, iTeamRecords } from "@/app/lib/types/databaseTypes";
import Matchup from "./Matchup";
import styles from "./ScheduleList.module.css";

export default function ScheduleList({
  data,
  team_records,
}: {
  data: Array<iGame>;
  team_records: iTeamRecords;
}) {
  return (
    <div className={`${styles["container"]} overflow-scroll rounded-lg w-full`}>
      {data.map((game_data, index) => (
        <Matchup
          game_data={game_data}
          home_team_record={team_records[game_data.home_team]}
          away_team_record={team_records[game_data.away_team]}
          color={index % 2 === 0 ? "even-rows" : "odd-rows"}
        ></Matchup>
      ))}
    </div>
  );
}
