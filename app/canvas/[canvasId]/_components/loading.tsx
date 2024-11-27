import { Loader } from "lucide-react";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

export function Loading() {
  return (
    <main className="h-screen w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Info.Skeleton />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
      <Loader className="animate-spin h-6 w-6 text-muted-foreground" />
    </main>
  )
}