import { iRoster, iPlayerStats, iSchedule } from "./databaseTypes";
import {
  RosterHeadCell,
  PlayerStatsHeadCell,
  ScheduleHeadCell,
} from "./visualTypes";

export type T = iRoster | iPlayerStats | iSchedule;
export type HeadCell = RosterHeadCell | PlayerStatsHeadCell | ScheduleHeadCell;
