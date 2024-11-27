import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Overlay } from "../overlay";
import { CanvasCardFooter } from "./canvas-card-footer";
import { Actions } from "@/components/actions";
import { Button } from "@/components/ui/button";
import { EllipsisIcon, MoreHorizontalIcon } from "lucide-react";

interface canvasCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  teamId: string;
}

export function CanvasCard({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  teamId,
}: canvasCardProps) {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "あなた" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  return (
    <div
      className="group aspect-[100/127] border rounded-lg 
      flex flex-col justify-between overflow-hidden"
    >
      <div className="relative flex-1 bg-white">
        <Image src={imageUrl} alt={title} fill className="object-fit" />
        <Link href={`/canvas/${id}`}>
          <Overlay />
        </Link>
      </div>
      <CanvasCardFooter
        title={title}
        authorLabel={authorLabel}
        createdAtLabel={createdAtLabel}
        onClick={() => {}}
        disabled={false}
        id={id}
      />
    </div>
  );
}
