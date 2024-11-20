import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Image from "next/image";

export function NoCanvas() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="/takingNotes.svg"
        alt="taking notes"
        width={300}
        height={300}
      />
      <h1 className="font-bold text-2xl">No Canvas Found</h1>
      <h2 className="text-sm text-slate-600">
        Start by creating a canvas for your team
      </h2>
      <Button className="mt-5">
        <PlusIcon />
        Create Canvas
      </Button>
    </div>
  );
}
