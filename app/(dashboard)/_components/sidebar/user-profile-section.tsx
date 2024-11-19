import { UserButton } from "@clerk/nextjs"
import { currentUser } from '@clerk/nextjs/server'

export async function UserProfileSection() {
  const user = await currentUser();
  return (
    <div className="w-full border-t border-gray-200 flex items-center pt-3">
      <div className="flex  items-center justify-center gap-5 ml-5">
        <UserButton />
        <div>
          <h1>{user?.firstName || "User"}</h1>
        </div>
      </div>
    </div>
  )
}