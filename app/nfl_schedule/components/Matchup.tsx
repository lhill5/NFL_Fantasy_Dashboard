import React from "react";
import { useState, useEffect } from "react";
import { getTeamLogo } from "@/app/lib/data/filebase";
import { iGame } from "@/app/lib/types/databaseTypes";
import styles from "./ScheduleList.module.css";

export default function Matchup({
  game_data,
  home_team_record,
  away_team_record,
  color,
}: {
  game_data: iGame;
  home_team_record: { [key: string]: number };
  away_team_record: { [key: string]: number };
  color: string;
}) {
  const [logo, setLogo] = useState("");

  useEffect(() => {
    if (
      home_team_record === undefined ||
      home_team_record === null ||
      home_team_record.length === 0
    ) {
      console.log(home_team_record);
    }
  }, []);
  return (
    <div
      className={`${styles[color]} flex flex-row h-14 border-b-2 border-white`}
    >
      <div className="flex flex-row w-11/12 m-auto justify-evenly items-center ">
        <div className="basis-5/12 flex flex-row h-full justify-around items-center">
          <h6 className="basis-2/3 text-right">
            {"(" + away_team_record.won + "-" + away_team_record.loss + ") "}
            <span className="invisible lg:visible">{game_data.away_team}</span>
          </h6>
          <img
            className=""
            src={getTeamLogo(game_data.away_team)}
            width="50px"
          />
        </div>
        <div className="basis-2/12 flex flex-row h-full justify-around items-center">
          <span>{game_data.away_score_total} </span>
          <span>@</span>
          <span>{game_data.home_score_total} </span>
        </div>

        <div className="basis-5/12 flex flex-row h-full justify-around items-center">
          <img
            className=""
            src={getTeamLogo(game_data.home_team)}
            width="50px"
          />
          <h6 className="basis-2/3">
            {"(" + home_team_record.won + "-" + home_team_record.loss + ") "}
            {game_data.home_team}
          </h6>
        </div>
      </div>
    </div>
  );
}
