import { CircleLayer } from "@/app/types/canvas"
import { colorToCss } from "@/lib/utils";

interface CircleProps {
  id: string
  layer: CircleLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string
}

export const Circle = ({
  id,
  layer,
  onPointerDown,
  selectionColor
}: CircleProps) => {
  const { x, y, height, width, fillColor } = layer

  return (
    <ellipse
      className="drop-shadow-md"
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      cx={width / 2}
      cy={height / 2}
      rx={width / 2}
      ry={height / 2}
      fill={fillColor ? colorToCss(fillColor) : "#000"}
      onPointerDown={(e) => onPointerDown(e, id)}
      stroke={selectionColor || "transparent"}
      strokeWidth="1"
    />
  )
}