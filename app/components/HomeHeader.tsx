import React from "react";
import Link from "next/link";
import styles from "./HomeHeader.module.css";

export default function HomeHeader() {
  return (
    <header className={styles["blur-header"]}>
      <Link href="/" className="">
        Home
      </Link>
      <Link href="/nfl_teams" className="">
        Teams
      </Link>
      <Link href="/nfl_players" className="">
        Players
      </Link>
      <Link href="/nfl_schedule" className="">
        Schedule
      </Link>
      <Link href="/nfl_fantasy" className="">
        Fantasy Tracker
      </Link>
      <Link href="/nfl_stats" className="">
        NFL Stats
      </Link>
    </header>
  );
}
