import { Room } from "./room";
import { Canvas } from "./canvas";

export default function Home() {
  return (
    <Room roomId="test-room-1">
      <Canvas />
    </Room>
  );
}
