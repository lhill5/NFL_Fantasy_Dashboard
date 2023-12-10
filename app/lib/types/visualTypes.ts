import { iPlayerStats, iRoster, iSchedule } from "./databaseTypes";

export interface RosterHeadCell {
  disablePadding: boolean;
  id: keyof iRoster;
  label: string;
  numeric: boolean;
  width: number;
}

export interface PlayerStatsHeadCell {
  disablePadding: boolean;
  id: keyof iPlayerStats;
  label: string;
  numeric: boolean;
  width: number;
}

export interface ScheduleHeadCell {
  disablePadding: boolean;
  id: keyof iSchedule;
  label: string;
  numeric: boolean;
  width: number;
}
