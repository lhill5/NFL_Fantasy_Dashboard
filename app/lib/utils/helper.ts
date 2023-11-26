import { T } from "../types/genericTypes";

export default function groupAndSum(
  data: T[],
  groupByProperties: string[]
): T[] {
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
