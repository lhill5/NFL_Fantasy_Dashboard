import { iRoster, iPlayerStats, iGame } from "./databaseTypes";
import { RosterHeadCell, PlayerStatsHeadCell } from "./visualTypes";

export type T = iRoster | iPlayerStats | iGame;
export type HeadCell = RosterHeadCell | PlayerStatsHeadCell;

export type filterType = {
  [key: string]: { [key: string]: string | number | null };
};
