"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { UserAvatar } from "./user-avator";
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOWN_OTHER_USERS = 2;

export function Participants() {
  const otherUsers = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = otherUsers.length > MAX_SHOWN_OTHER_USERS;

  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {otherUsers.slice(0, MAX_SHOWN_OTHER_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColor={connectionIdToColor(connectionId)}
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || "T"}
            />
          )
        })}
        {currentUser &&
          <UserAvatar
            borderColor={connectionIdToColor(currentUser.connectionId)}
            key={currentUser.connectionId}
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (あなた)`}
            fallback={currentUser.info?.name?.[0]}
          />
        }

        {hasMoreUsers &&
          <UserAvatar
            name={`${otherUsers.length - MAX_SHOWN_OTHER_USERS} more user(s)`}
            fallback={`+${otherUsers.length - MAX_SHOWN_OTHER_USERS}`}
          />
        }
      </div>
    </div>
  )
}

export function ParticipantsSkeleton() {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]">
    </div>
  )
}