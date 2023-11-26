import { iPlayerStats, iRoster } from "./databaseTypes";

export interface RosterHeadCell {
  disablePadding: boolean;
  id: keyof iRoster;
  label: string;
  numeric: boolean;
}

export interface PlayerStatsHeadCell {
  disablePadding: boolean;
  id: keyof iPlayerStats;
  label: string;
  numeric: boolean;
}
