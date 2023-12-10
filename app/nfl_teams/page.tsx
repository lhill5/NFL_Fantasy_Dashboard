import {
  getOffensiveStats_Join_Roster,
  updateRoster,
} from "../lib/data/NFLVerseAPI";
import groupAndSum from "@/app/lib/utils/helper";
import ClientPage from "./components/ClientPage";

async function fetchData(position: string) {
  const res = await getOffensiveStats_Join_Roster({ position: position });
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
  const position: string =
    "position" in searchParams ? searchParams.position : "QB";

  const playerStats = await fetchData(position);
  return (
    <div className="w-screen h-screen">
      <ClientPage playerStats={playerStats}></ClientPage>
    </div>
  );
}
