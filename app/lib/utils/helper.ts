import { T } from "../types/genericTypes";

export function groupAndSum(data: T[], groupByProperties: string[]): T[] {
  const groupedData: Record<string, T> = {};

  for (const item of data) {
    const groupByKey = groupByProperties.map((prop) => item[prop]).join("|");
    if (!groupedData[groupByKey]) {
      groupedData[groupByKey] = { ...item };
    } else {
      // Sum the numeric columns
      for (const key in item) {
        if (
          typeof item[key] === "number" &&
          key !== "season" &&
          key !== "week"
        ) {
          groupedData[groupByKey][key] =
            (groupedData[groupByKey][key] || 0) + item[key];
        }
      }
    }
  }

  return Object.values(groupedData) as T[];
}

export function convertLongTeamName(longTeamName: string) {
  let shortTeamName = "";
  switch (longTeamName) {
    case "Atlanta Falcons":
      shortTeamName = "ATL";
      break;
    case "Cincinnati Bengals":
      shortTeamName = "CIN";
      break;
    case "Tennessee Titans":
      shortTeamName = "TEN";
      break;
    case "Indianapolis Colts":
      shortTeamName = "IND";
      break;
    case "New York Giants":
      shortTeamName = "NYG";
      break;
    case "Houston Texans":
      shortTeamName = "HOU";
      break;
    case "Denver Broncos":
      shortTeamName = "DEN";
      break;
    case "Arizona Cardinals":
      shortTeamName = "ARI";
      break;
    case "Las Vegas Raiders":
      shortTeamName = "LV";
      break;
    case "Philadelphia Eagles":
      shortTeamName = "PHI";
      break;
    case "Los Angeles Chargers":
      shortTeamName = "LAC";
      break;
    case "Minnesota Vikings":
      shortTeamName = "MIN";
      break;
    case "Dallas Cowboys":
      shortTeamName = "DAL";
      break;
    case "New England Patriots":
      shortTeamName = "NE";
      break;
    case "New Orleans Saints":
      shortTeamName = "NO";
      break;
    case "New York Jets":
      shortTeamName = "NYJ";
      break;
    case "Pittsburgh Steelers":
      shortTeamName = "PIT";
      break;
    case "Washington Commanders":
      shortTeamName = "WAS";
      break;
    case "Tampa Bay Buccaneers":
      shortTeamName = "TB";
      break;
    case "Los Angeles Rams":
      shortTeamName = "LAR";
      break;
    case "Green Bay Packers":
      shortTeamName = "GB";
      break;
    case "Jacksonville Jaguars":
      shortTeamName = "JAX";
      break;
    case "Chicago Bears":
      shortTeamName = "CHI";
      break;
    case "Cleveland Browns":
      shortTeamName = "CLE";
      break;
    case "Baltimore Ravens":
      shortTeamName = "BAL";
      break;
    case "Buffalo Bills":
      shortTeamName = "BUF";
      break;
    case "San Francisco 49ers":
      shortTeamName = "SF";
      break;
    case "Kansas City Chiefs":
      shortTeamName = "KC";
      break;
    case "Miami Dolphins":
      shortTeamName = "MIA";
      break;
    case "Detroit Lions":
      shortTeamName = "DET";
      break;
    case "Carolina Panthers":
      shortTeamName = "CAR";
      break;
    case "Seattle Seahawks":
      shortTeamName = "SEA";
      break;

    default:
      shortTeamName = longTeamName;
  }
  return shortTeamName;
}
