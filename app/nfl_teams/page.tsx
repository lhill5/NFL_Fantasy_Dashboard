import {
  getOffensiveStats_Join_Roster,
  updateRoster,
} from "../lib/data/NFLVerseAPI";
import { groupAndSum } from "@/app/lib/utils/helper";
import ClientPage from "./components/ClientPage";
import { T } from "../lib/types/genericTypes";

async function fetchData(position: string | null = null) {
  const res: T[] = await getOffensiveStats_Join_Roster({
    ...(position !== "" && {
      position: { value: position, filterType: "eq" },
    }),
  });
  const data = groupAndSum(res, ["player_id", "season"]);
  return data;
}

// async function fetchTeamRecords() {
//   let data = await GET_Team_Records();
//   return data;
// }

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string };
}) {
  const season: string =
    "season" in searchParams ? searchParams.season : "2023";
  const week: string = searchParams.week;
  const team: string = searchParams.team;

  const stats = await fetchData();

  const season_list = [
    ...new Set(stats.map((obj: { season: any }) => obj.season)),
  ];

  const position: string =
    "position" in searchParams ? searchParams.position : "QB";

  const playerStats = await fetchData(position);
  console.log(playerStats);

  return (
    <div className="w-screen h-screen">
      <ClientPage playerStats={playerStats}></ClientPage>
    </div>
  );
}
