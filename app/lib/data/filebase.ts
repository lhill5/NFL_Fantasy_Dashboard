// retrieves files from supabase buckets
import { supabase } from "../database/connector";
import { convertLongTeamName } from "../utils/helper";

export function getTeamLogo(team: string = "TB") {
  let teamShort = convertLongTeamName(team);
  let logoUrl: string = `${teamShort}.png`;

  const teamLogoBucket = supabase.storage
    .from("nfl_team_logos")
    .getPublicUrl(logoUrl);

  const publicUrl = teamLogoBucket.data.publicUrl;
  return publicUrl;
}
