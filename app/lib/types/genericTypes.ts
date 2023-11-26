import { iRoster, iPlayerStats } from "./databaseTypes";
import { RosterHeadCell, PlayerStatsHeadCell } from "./visualTypes";

export type T = iRoster | iPlayerStats;
export type HeadCell = RosterHeadCell | PlayerStatsHeadCell;
