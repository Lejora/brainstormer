import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { SettingsIcon } from "lucide-react";
import Link from "next/link";

export async function UserProfileSection() {
  const user = await currentUser();
  return (
    <div
      className="w-full border-t border-gray-200 flex items-center
     py-3 bg-blue-100 rounded-b-xl"
    >
      <div className="flex items-center justify-between gap-5 ml-5 w-full">
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center relative">
            <UserButton />
            <div
              className="absolute left-5 bottom-[-3px] w-3 h-3
           bg-green-500 rounded-full border-blue-100 border-2"
            ></div>
          </div>
          <div>
            <h1 className="text-slate-800">
              {user?.firstName || "User"} {user?.lastName}
            </h1>
          </div>
        </div>
        <div className="mr-5 flex items-center justify-center">
          <SettingsIcon
            width={20}
            height={20}
            className="text-slate-600 hover:text-slate-500 transition-all mt-[3px]"
          />
        </div>
      </div>
    </div>
  );
}
