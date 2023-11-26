import { POST } from "./dbAPI";

const apiUrl = "https://v1.american-football.api-sports.io/games";
const apiKey = process.env.NEXT_FOOTBALL_API_KEY as string;

const headers = {
  "x-rapidapi-key": apiKey,
  "x-rapidapi-host": "https://v1.american-football.api-sports.io",
};

const params = new URLSearchParams();
params.set("league", "1");

export async function getSchedule(season: string) {
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
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

export async function updateSchedule() {
  const full_schedule = await getSchedule("2023");

  const comp_schedule = full_schedule.response.filter(
    (matchup: { game: { stage: string } }) =>
      matchup.game.stage !== "Pre Season"
  );

  const sch_game = comp_schedule.game;
  const away_scores = comp_schedule.scores.away;
  const home_scores = comp_schedule.scores.home;
  const away_team = comp_schedule.teams.away;
  const home_team = comp_schedule.teams.home;

  const res = await POST("Schedule", comp_schedule);
}
