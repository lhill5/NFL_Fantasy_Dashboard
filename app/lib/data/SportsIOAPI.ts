import { iTeamRecords } from "../types/databaseTypes";
import { filterType } from "../types/genericTypes";
import { GET, POST } from "./dbAPI";
import { buildQuery } from "./dbAPI";

const apiUrl = "https://v1.american-football.api-sports.io/games";
const apiKey = process.env.NEXT_FOOTBALL_API_KEY as string;

const headers = {
  "x-rapidapi-key": apiKey,
  "x-rapidapi-host": "https://v1.american-football.api-sports.io",
};

const params = new URLSearchParams();
params.set("league", "1");

async function getScheduleAPI(season: string) {
  params.set("season", season);
  try {
    const urlWithParams = `${apiUrl}?${params.toString()}`;
    const res = await fetch(urlWithParams, {
      method: "GET",
      headers: headers,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    let data = await res.json();

    // check for API specific errors
    if (data.errors.length) {
      throw data.errors;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function flattenSchedule(schedule: Array<any>) {
  let schedule_flattened = [];
  let row: { [key: string]: number | string } = {};
  for (let matchup of schedule) {
    row = {};
    if (matchup.game.stage !== "Pre Season") {
      row.id = matchup.game.id; // number
      row.type = matchup.league.name;
      row.stage = matchup.game.stage;
      row.season = matchup.league.season;
      row.week = matchup.game.week;
      row.date = matchup.game.date.date;
      row.status = matchup.game.status.long;

      row.home_team = matchup.teams.home.name;
      row.home_team_id = matchup.teams.home.id;
      row.home_team_logo = matchup.teams.home.logo;
      row.home_score_q1 = matchup.scores.home.quarter_1;
      row.home_score_q2 = matchup.scores.home.quarter_2;
      row.home_score_q3 = matchup.scores.home.quarter_3;
      row.home_score_q4 = matchup.scores.home.quarter_4;
      row.home_score_overtime = matchup.scores.home.overtime;
      row.home_score_total = matchup.scores.home.total;

      row.away_team = matchup.teams.away.name;
      row.away_team_id = matchup.teams.away.id;
      row.away_team_logo = matchup.teams.away.logo;
      row.away_score_q1 = matchup.scores.away.quarter_1;
      row.away_score_q2 = matchup.scores.away.quarter_2;
      row.away_score_q3 = matchup.scores.away.quarter_3;
      row.away_score_q4 = matchup.scores.away.quarter_4;
      row.away_score_overtime = matchup.scores.away.overtime;
      row.away_score_total = matchup.scores.away.total;

      row.venue_name = matchup.game.venue.name;
      row.venue_city = matchup.game.venue.city;

      schedule_flattened.push(row);
    }
  }
  return schedule_flattened;
}

export async function GET_Schedule(filterObj: filterType = {}) {
  filterObj["home_team_id"] = { value: 0, filterType: "neq" };
  const query = buildQuery("Schedule", filterObj);
  const data = await GET(query);
  return data;
}

export async function GET_Team_Records(filterObj: filterType = {}) {
  filterObj["home_team_id"] = { value: 0, filterType: "neq" };
  const query = buildQuery("Schedule", filterObj);
  const data = await GET(query);

  let teamRecords: iTeamRecords = {};

  for (let game of data) {
    let home_team = game.home_team;
    let away_team = game.away_team;

    let home_score = game.home_score_total;
    let away_score = game.away_score_total;

    if (home_score !== null && away_score !== null) {
      let home_win = home_score > away_score ? 1 : 0;
      let away_win = away_score > home_score ? 1 : 0;
      let isTie = home_score === away_score ? 1 : 0;

      let updateTeamRecord = (
        team: string,
        win: number,
        loss: number,
        tie: number
      ) => {
        if (team in teamRecords) {
          const { won: wins, loss: losses, tied: ties } = teamRecords[team];

          teamRecords[team] = {
            won: wins + win,
            loss: losses + loss,
            tied: ties + tie,
          };
        } else {
          teamRecords[team] = { won: win, loss: loss, tied: tie };
        }
      };

      updateTeamRecord(home_team, home_win, home_win ? 0 : 1, isTie ? 1 : 0);
      updateTeamRecord(away_team, away_win, away_win ? 0 : 1, isTie ? 1 : 0);
    }
  }

  return teamRecords;
}

export async function POST_Schedule(season: string) {
  const full_schedule = await getScheduleAPI(season);
  const flattened_schedule = flattenSchedule(full_schedule.response);

  const res = await POST("Schedule", flattened_schedule);
  return full_schedule;
}
