import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";


export function InviteButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4" />
          Invite Members
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
        <DialogTitle></DialogTitle>
        <OrganizationProfile routing="hash" />
      </DialogContent>
    </Dialog>
  )
}