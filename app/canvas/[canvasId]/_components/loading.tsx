import { Loader } from "lucide-react";
import { InfoSkeleton } from "./info";
import { ParticipantsSkeleton } from "./participants";
import { ToolbarSkeleton } from "./toolbar";

export function Loading() {
  return (
    <main className="h-screen w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
      <Loader className="animate-spin h-6 w-6 text-muted-foreground select-none" />
    </main>
  )
}