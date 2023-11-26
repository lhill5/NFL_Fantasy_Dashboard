import { getOffensiveStats_Join_Roster, updateRoster } from "../lib/data/dbAPI";
import groupAndSum from "@/app/lib/utils/helper";
import ClientPage from "./components/ClientPage";
import { getSchedule, updateSchedule } from "../lib/data/SportsIOAPI";

async function fetchData(team: string) {
  const res = await getOffensiveStats_Join_Roster({ position: "RB" });
  const data = groupAndSum(res, ["player_id", "season"]);
  // getSchedule("2023");
  return data;
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string };
}) {
  const team: string = "team" in searchParams ? searchParams.team : "TB";
  const playerStats = await fetchData(team);
  return (
    <div className="w-screen h-screen">
      <ClientPage playerStats={playerStats}></ClientPage>
    </div>
  );
}
