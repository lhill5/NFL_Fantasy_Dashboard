import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../database/connector";
import { iPlayerStats, iRoster } from "../types/databaseTypes";
import { PY_GET_Roster } from "./NFLVerseAPI";

export async function getOffensivePlayerStats(
  filterObj: { [key: string]: string | number } = {}
) {
  const query = buildQuery("Player_Stats_Offense", filterObj);
  const data = await GET(query);
  return data;
}

export async function getOffensiveStats_Join_Roster(
  filterObj: { [key: string]: string | number } = {}
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

export async function getRoster(
  filterObj: { [key: string]: string | number } = {}
) {
  const query = buildQuery("Roster", filterObj);
  const res = await GET(query);
  return res;
}

export async function updateRoster() {
  const roster: any = await PY_GET_Roster();
  const res = await POST("Roster", roster);
}

// ----------- HELPER FUNCTIONS -------------------- //

async function buildQuery(
  tableName: string,
  filterObj: { [key: string]: string | number } = {}
) {
  try {
    let query = supabase.from(tableName).select();
    return addFilterQuery(query, filterObj);
  } catch (error) {
    throw error;
  }
}

async function addFilterQuery(
  query: PostgrestFilterBuilder<any, any, any[], unknown>,
  filterObj: { [key: string]: string | number } = {}
) {
  try {
    Object.keys(filterObj).forEach((key) => {
      const value = filterObj[key];
      query = query.eq(key, value);
    });
    return query;
  } catch (error) {
    throw error;
  }
}

export async function GET(query: Promise<PostgrestSingleResponse<any[]>>) {
  try {
    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function POST(tableName: string, data: Array<any>) {
  try {
    const { error } = await supabase.from(tableName).insert(data);
    if (error) throw error;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
