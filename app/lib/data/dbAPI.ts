import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../database/connector";
import { iPlayerStats, iRoster } from "../types/databaseTypes";
import { PY_GET_Roster } from "./NFLVerseAPI";
import { filterType } from "../types/genericTypes";

// ----------- HELPER FUNCTIONS -------------------- //

export async function buildQuery(
  tableName: string,
  filterObj: filterType = {}
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
  filterObj: filterType = {}
) {
  try {
    Object.keys(filterObj).forEach((key) => {
      const value = filterObj[key].value;
      const filterType = filterObj[key].filterType;

      if (value !== null && value !== undefined) {
        switch (filterType) {
          case "eq":
            query = query.eq(key, value);
            break;
          case "neq":
            query = query.neq(key, value);
            break;
          case "gt":
            query = query.gt(key, value);
            break;
          case "gte":
            query = query.gte(key, value);
            break;
          case "lt":
            query = query.lt(key, value);
            break;
          case "lte":
            query = query.lte(key, value);
            break;
          case "or":
            const secondaryKey = filterObj[key].secondaryKey;
            query = query.or(`${key}.eq.${value},${secondaryKey}.eq.${value}`);
            break;
          case "like":
            query = query.like(key, String(value));
            break;
          case "is":
            query = query.is(key, value);
            break;
          case "notNull":
            query = query.not(key, "is", null);
            break;
          default:
            query = query.eq(key, value);
            break;
        }
      }
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
