import {
  getOffensiveStats_Join_Roster,
  getRoster,
  updateRoster,
} from "../lib/data/NFLVerseAPI";
import groupAndSum from "@/app/lib/utils/helper";
import ClientPage from "./components/ClientPage";
import { GET_Schedule, POST_Schedule } from "../lib/data/SportsIOAPI";

async function fetchData() {
  let data = await GET_Schedule({ season: "2023" });

  return data;
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string };
}) {
  // const team: string = "team" in searchParams ? searchParams.team : "TB";
  // const position: string =
  //   "position" in searchParams ? searchParams.position : "QB";

  const schedule = await fetchData();
  return (
    <div className="w-screen h-screen">
      <ClientPage data={schedule}></ClientPage>
    </div>
  );
}
