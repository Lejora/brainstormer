"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/app/types/canvas";

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: ReactNode;
}

export function Room({ children, roomId, fallback }: RoomProps) {
  return (
    // publicApiKey={"pk_dev_ihvGdQ2Fr0DbEwGXPLUmQSpA1QRoTlog1Bap6iFa0x-Rnxxr6ntgx-BdbdNZLN8C"}
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth" throttle={16}>
      <RoomProvider
        id={roomId}
        initialPresence={{ cursor: null, selection: [] }}
        initialStorage={{
          layers: new LiveMap<string, LiveObject<Layer>>(),
          layerIds: new LiveList([]),
        }}
      >
        <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
