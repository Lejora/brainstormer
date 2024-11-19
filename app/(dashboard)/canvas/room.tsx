"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

interface RoomProps {
  children: ReactNode
  roomId: string
}

export function Room({
  children,
  roomId
}: RoomProps) {
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_ihvGdQ2Fr0DbEwGXPLUmQSpA1QRoTlog1Bap6iFa0x-Rnxxr6ntgx-BdbdNZLN8C"}>
      <RoomProvider
        id={roomId}
        initialPresence={{}}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}