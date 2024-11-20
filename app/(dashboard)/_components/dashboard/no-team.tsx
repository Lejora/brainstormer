import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CreateOrganization } from "@clerk/nextjs";

export function NoTeam() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src="/art.svg" alt="painting" width={400} height={400} />
      <h1 className="font-bold text-2xl">Welcome to Brainstormer</h1>
      <h2 className="text-sm text-slate-600">Create an team to get started</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4">
            <PlusIcon />
            Create Team
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 bg-transparent border-none max-w-[440px]">
            <DialogTitle></DialogTitle>
            <CreateOrganization routing="hash" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
