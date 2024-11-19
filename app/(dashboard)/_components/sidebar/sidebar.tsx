import { Logo } from "./logo"
import Link from "next/link"
import { UserProfileSection } from "./user-profile-section"
import { TeamList } from "./team-list"
import { CreateTeamButton } from "./create-team-button"

export function Sidebar() {
  return (
    <div className="fixed z-[1] left-0 w-[250px] bg-white h-full shadow-lg py-2">
      <Link href="/">
        <Logo />
      </Link>

      <div className="px-4 mt-10">
        <h2 className="font-semibold text-gray-600 tracking-wider mb-2">
          Teams
        </h2>
        <div className="mb-2">
          <TeamList />
        </div>
        <div className="my-8">
          <CreateTeamButton />
        </div>
      </div>

      <div className="absolute bottom-3 w-full">
        <UserProfileSection />
      </div>
    </div>
  )
}