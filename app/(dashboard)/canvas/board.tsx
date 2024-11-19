"use client"

import { useOthers } from "@liveblocks/react/suspense";
import { Toolbar } from "@/components/toolbar"
import Link from "next/link";

export default function Board() {
  const others = useOthers();
  const userCount = others.length;
  return (
    <div>
      <div>There are {userCount} other user(s) online</div>
      <Link href="/">
        もどリンク
      </Link >
      <Toolbar />
    </div >
  )
}