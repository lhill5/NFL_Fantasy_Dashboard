"use client";

import React from "react";

export default function Sidebar({ className }: { className: string }) {
  return (
    <div className={className}>
      <aside className="bg-gray-300 rounded-md text-black">
        <div className="flex items-center justify-center">
          <h3>NFL Fantasy App</h3>
        </div>
        <section className="flex flex-col justify-between h-1/4">
          <div className="">Schedule</div>
          <div className="">Teams</div>
          <div className="">Players</div>
          <div className="">Fantasy Football</div>
          <div className="">NFL Stats</div>
        </section>
      </aside>
    </div>
  );
}
