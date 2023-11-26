export interface iPlayerStats {
  id: string;
  player_id: string;
  player_name: string;
  player_display_name: string;
  position: string;
  position_group: string;
  recent_team: string;
  season: number;
  week: number;
  season_type: string;
  opponent_team: string;
  completions: number;
  attempts: number;
  passing_yards: number;
  passing_tds: number;
  interceptions: number;
  sacks: number;
  sack_yards: number;
  sack_fumbles: number;
  sack_fumbles_lost: number;
  passing_air_yards: number;
  passing_yards_after_catch: number;
  passing_first_downs: number;
  passing_epa: number;
  passing_2pt_conversions: number;
  pacr: number;
  dakota: number;
  carries: number;
  rushing_yards: number;
  rushing_tds: number;
  rushing_fumbles: number;
  rushing_fumbles_lost: number;
  rushing_first_downs: number;
  rushing_epa: number;
  rushing_2pt_conversions: number;
  receptions: number;
  targets: number;
  receiving_yards: number;
  receiving_tds: number;
  receiving_fumbles: number;
  receiving_fumbles_lost: number;
  receiving_air_yards: number;
  receiving_yards_after_catch: number;
  receiving_first_downs: number;
  receiving_epa: number;
  receiving_2pt_conversions: number;
  racr: number;
  target_share: number;
  air_yards_share: number;
  wopr: number;
  special_teams_tds: number;
  fantasy_points: number;
  fantasy_points_ppr: number;
  Roster: { [key: string]: any };
  [key: string]: any;
}

export interface iRoster {
  id: string;
  season: number;
  team: string;
  position: string;
  depth_chart_position: string;
  jersey_number: number;
  status: string;
  full_name: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  height: number;
  weight: number;
  college: string;
  gsis_id: string;
  years_exp: number;
  headshot_url: string;
  ngs_position: string;
  status_description_abbr: string;
  rookie_year: number;
  draft_club: string;
  draft_number: number;
  [key: string]: any;
}

export interface RosterColumn {
  key: string;
  value: string;
}
