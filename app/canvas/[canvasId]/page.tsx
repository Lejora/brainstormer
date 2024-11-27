import { Board } from "./_components/board";
import { Loading } from "./_components/loading";
import { Room } from "./_components/room";

interface CanvasIdPageProps {
  params: {
    canvasId: string;
  }
}

export default function CanvasIdPage({ params }: CanvasIdPageProps) {
  return (
    <Room roomId={params.canvasId} fallback={<Loading />}>
      <Board canvasId={params.canvasId} />
    </Room>
  )
}