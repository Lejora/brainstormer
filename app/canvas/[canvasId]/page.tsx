import { Board } from "./_components/board";
import { Room } from "./_components/room";
import { Loading } from "./_components/loading";

interface CanvasIdPageProps {
  params: Promise<{
    canvasId: string;
  }>;
}


export default async function CanvasIdPage({ params }: CanvasIdPageProps) {
  const resolvedParams = await params;
  const canvasId = resolvedParams.canvasId;

  return (
    <Room roomId={canvasId} fallback={<Loading />}>
      <Board canvasId={canvasId} />
    </Room>
  )
}