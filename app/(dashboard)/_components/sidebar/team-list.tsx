"use client"

import { useOrganizationList } from "@clerk/clerk-react";
import { TeamButton } from "./team-button";

export function TeamList() {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    }
  })

  if (!userMemberships.data?.length) {
    return;
  }

  return (
    <ul className="flex flex-col gap-4">
      {userMemberships.data?.map((mem) => (
        <li key={mem.organization.id}>
          <TeamButton
            label={mem.organization.name}
            imgUrl={mem.organization.imageUrl}
            id={mem.organization.id}
          />
        </li>
      ))}
    </ul>
  )
}