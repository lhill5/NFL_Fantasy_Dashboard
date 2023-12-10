import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../database/connector";
import { iPlayerStats, iRoster } from "../types/databaseTypes";
import { PY_GET_Roster } from "./NFLVerseAPI";

// ----------- HELPER FUNCTIONS -------------------- //

export async function buildQuery(
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

export async function addFilterQuery(
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
