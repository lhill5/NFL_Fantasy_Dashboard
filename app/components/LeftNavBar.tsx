"use client";

import React from "react";
import Link from "next/link";

export default function Sidebar({ className }: { className: string }) {
  return (
    <div className={className}>
      <aside className="bg-gray-300 rounded-md text-black">
        <div className="flex items-center justify-center">
          <h3>NFL Fantasy App</h3>
        </div>
        <section className="flex flex-col justify-between h-1/4">
          <Link href="/nfl_schedule" className="">
            Schedule
          </Link>
          <Link href="/nfl_teams" className="">
            Teams
          </Link>
          <Link href="/" className="">
            Players
          </Link>
          <Link href="/" className="">
            Fantasy Football
          </Link>
          <Link href="/" className="">
            NFL Stats
          </Link>
        </section>
      </aside>
    </div>
  );
}
