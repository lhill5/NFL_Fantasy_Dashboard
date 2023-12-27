import ClientPage from "./components/ClientPage";
import HomeHeader from "../components/HomeHeader";
import { GET_Schedule, GET_Team_Records } from "../lib/data/SportsIOAPI";
import { filterType } from "../lib/types/genericTypes";

async function fetchTeamRecords() {
  let data = await GET_Team_Records();
  return data;
}

async function fetchSchedule(filterParams: filterType = {}) {
  let data = await GET_Schedule(filterParams);
  return data;
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string };
}) {
  console.log(searchParams);

  const season: string =
    "season" in searchParams ? searchParams.season : "2023";
  const week: string = searchParams.week;
  const team: string = searchParams.team;

  const schedule = await fetchSchedule({
    ...(season !== "" && {
      season: { value: season, filterType: "eq" },
    }),
    ...(week !== "" && {
      week: { value: week, filterType: "eq" },
    }),
    ...(team !== "" && {
      home_team: { value: team, filterType: "or", secondaryKey: "away_team" },
    }),
  });

  const full_schedule = await fetchSchedule();
  const team_records = await fetchTeamRecords();

  const season_list = [...new Set(full_schedule.map((obj) => obj.season))];
  const week_list = [...new Set(full_schedule.map((obj) => obj.week))];
  const team_list = [
    ...new Set([
      ...full_schedule.map((obj) => obj.home_team),
      ...full_schedule.map((obj) => obj.away_team),
    ]),
  ];

  return (
    <div className="w-screen h-screen">
      <HomeHeader></HomeHeader>
      <ClientPage
        data={schedule}
        season_list={season_list}
        week_list={week_list}
        team_list={team_list}
        team_records={team_records}
      ></ClientPage>
    </div>
  );
}
