"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import styles from "./LeftNavBar.module.css";

export default function Sidebar({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`${styles["background"]} ${className} rounded-md text-black`}
    >
      <main className="m-auto"></main>
      {children}
    </div>
  );
}
