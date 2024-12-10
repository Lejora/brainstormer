import { Logo } from "./logo";
import Link from "next/link";
import { UserProfileSection } from "./user-profile-section";
import { TeamList } from "./team-list";
import { CreateTeamButton } from "./create-team-button";

export function Sidebar() {
  return (
    <div
      className="fixed z-[1] left-0 w-[250px] bg-blue-50
    h-[98%] shadow-lg rounded-xl mx-2"
    >
      <div className="flex flex-col justify-between h-full">
        <div className="mt-2">
          <Link href="/">
            <Logo />
          </Link>

          <div className="px-4 mt-10">
            <div className="my-8">
              <CreateTeamButton />
            </div>
            <h2 className="text-gray-600 tracking-wider mb-2 text-sm">
              チーム
            </h2>
            <div className="mb-2">
              <TeamList />
            </div>
          </div>
        </div>
        <div className="w-full">
          <UserProfileSection />
        </div>
      </div>
    </div>
  );
}
