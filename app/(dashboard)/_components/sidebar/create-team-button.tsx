import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";

export function CreateTeamButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full font-semibold text-white bg-blue-600 hover:bg-blue-800 hover:text-white
          flex items-center justify-center transition-all duration-300 focus:outline-none"
        >
          <PlusIcon />
          <h1>Create Team</h1>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
        <DialogTitle></DialogTitle>
        <CreateOrganization routing="hash" />
      </DialogContent>
    </Dialog>
  )
}