import { supabase } from "../database/connector";

import { iRoster } from "../types/databaseTypes";
import { iPlayerStats } from "../types/databaseTypes";
import { filterType } from "../types/genericTypes";
import { GET, POST, buildQuery, addFilterQuery } from "./dbAPI";

export async function PY_GET_PlayerStats() {
  try {
    let res = await fetch("http://127.0.0.1:8080/nfl_api/player_stats/2023", {
      cache: "no-store",
    });

    const result: iPlayerStats[] = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function PY_GET_Roster() {
  try {
    const res = await fetch("http://127.0.0.1:8080/nfl_api/roster/2023", {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        // You can add other headers if needed
      },
    });

    const result: iRoster[] = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getRoster(filterObj: filterType = {}) {
  const query = buildQuery("Roster", filterObj);
  const res = await GET(query);
  return res;
}

export async function updateRoster() {
  try {
    const roster: any = await PY_GET_Roster();
    const res = await POST("Roster", roster);
  } catch (error) {
    throw error;
  }
}

export async function getOffensivePlayerStats(filterObj: filterType = {}) {
  const query = buildQuery("Player_Stats_Offense", filterObj);
  const data = await GET(query);
  return data;
}

export async function getOffensiveStats_Join_Roster(
  filterObj: filterType = {}
) {
  const query = supabase.from("Player_Stats_Offense").select(`
  *, 
  Roster ( team, position, jersey_number, headshot_url )
`);

  const filterQuery = addFilterQuery(query, filterObj);
  const res = await filterQuery;

  const { data, error }: { data: iPlayerStats[]; error: any } = res as any;
  if (error) throw error;

  return data;
}
