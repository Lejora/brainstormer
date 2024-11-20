"use client";

import { useOthers } from "@liveblocks/react/suspense";
import { Tldraw } from "tldraw";
import { Toolbar } from "@/components/toolbar";
import Link from "next/link";

export default function Board() {
  const others = useOthers();
  const userCount = others.length;
  return (
    <div className="w-screen h-screen">
      <Tldraw autoFocus />
      <div>
        <div>There are {userCount} other user(s) online</div>
        <Link href="/">もどリンク</Link>
        <Toolbar />
      </div>
    </div>
  );
}
