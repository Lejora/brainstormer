"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useOrganization, useOrganizationList } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";

interface TeamButtonProps {
  label: string
  imgUrl: string
  id: string
}

export function TeamButton({
  label,
  imgUrl,
  id
}: TeamButtonProps) {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;
  const onClick = () => {
    if (!setActive) return;
    setActive({ organization: id })
  }

  return (
    <Button
      variant="ghost"
      className={cn("flex justify-start w-full py-3 h-12", isActive && "bg-blue-100")}
      onClick={onClick}
    >
      <div className="flex items-center justify-center gap-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src={imgUrl || "https://github.com/shadcn.png"} />
          <AvatarFallback>{label}</AvatarFallback>
        </Avatar>
        <h1>{label}</h1>
      </div>
    </Button>
  )
}