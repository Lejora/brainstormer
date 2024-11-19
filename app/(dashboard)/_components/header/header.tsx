"use client"

import { InviteButton } from "./invite-button";
import { useOrganization } from "@clerk/clerk-react";

export function Header() {
  const organization = useOrganization()

  return (
    <div className="h-[150px] w-full px-5 py-5">
      <div className="absolute right-6">
        {organization && (
          <InviteButton />
        )}
      </div>
    </div>
  )
}