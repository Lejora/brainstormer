"use client"

import { useOthers } from "@liveblocks/react/suspense";
import { Toolbar } from "@/components/toolbar"

export function Canvas() {
  const others = useOthers();
  const userCount = others.length;
  return (
    <div>
      <div>There are {userCount} other user(s) online</div>
      <Toolbar />
    </div>
  )
}