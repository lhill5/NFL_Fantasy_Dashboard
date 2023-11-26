import { iRoster } from "../types/databaseTypes";
import { iPlayerStats } from "../types/databaseTypes";

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
