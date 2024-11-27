"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { NoCanvas } from "./no-canvas";
import { CanvasCard } from "./canvas-card/canvas-card";
import { NewCanvasButton } from "./new-canvas-button";
import { CanvasCardSkeleton } from "./canvas-card/canvas-card-skeleton";

interface CanvasListProps {
  teamId: string;
}

export function CanvasList({ teamId }: CanvasListProps) {
  const data = useQuery(api.canvases.get, { teamId });

  if (data === undefined) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 
      md:grid-cols-4 2xl:grid-cols-6 gap-5 mt-8 pb-10"
      >
        <NewCanvasButton teamId={teamId} disabled={true} />
        <CanvasCardSkeleton />
        <CanvasCardSkeleton />
        <CanvasCardSkeleton />
      </div>
    );
  }

  if (!data?.length) {
    return <NoCanvas />;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">チームのキャンバス</h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 
      md:grid-cols-4 2xl:grid-cols-6 gap-5 mt-8 pb-10"
      >
        <NewCanvasButton teamId={teamId} disabled={false} />
        {data.map((canvas) => (
          <CanvasCard
            key={canvas._id}
            id={canvas._id}
            title={canvas.title}
            imageUrl={canvas.imageUrl}
            authorId={canvas.authorId}
            authorName={canvas.authorName}
            createdAt={canvas._creationTime}
            teamId={canvas.teamId}
          />
        ))}
      </div>
    </div>
  );
}
