"use client"

import { Room } from "./room";
import Board from "./board";


export default function Canvas() {
  return (
    <main>
      <Room roomId="test-room-1">
        <Board />
      </Room>
    </main>
  );
}
