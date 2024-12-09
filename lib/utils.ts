import { Camera, Color, Point, Side, XYWH } from "@/app/types/canvas";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const COLORS = ["#DC2626", "#D97646", "#7C3AED", "#DB2777", "#059669"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}

export function colorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

export function resizeBounds(bounds: XYWH, corner: Side, point: Point): XYWH {
  const result = { ...bounds };

  switch (corner) {
    case Side.Left:
      if (point.x > bounds.x + bounds.width) {
        result.x = bounds.x + bounds.width;
        result.width = 0;
      } else {
        result.x = Math.min(point.x, bounds.x + bounds.width);
        result.width = Math.abs(bounds.x + bounds.width - point.x);
      }
      break;
    case Side.Right:
      result.width = Math.max(point.x - bounds.x, 0);
      break;
    case Side.Top:
      if (point.y > bounds.y + bounds.height) {
        result.y = bounds.y + bounds.height;
        result.height = 0;
      } else {
        result.y = Math.min(point.y, bounds.y + bounds.height);
        result.height = Math.abs(bounds.y + bounds.height - point.y);
      }
      break;
    case Side.Bottom:
      result.height = Math.max(point.y - bounds.y, 0);
      break;
    case Side.TopLeft:
      if (point.x > bounds.x + bounds.width) {
        result.x = bounds.x + bounds.width;
        result.width = 0;
      } else {
        result.x = Math.min(point.x, bounds.x + bounds.width);
        result.width = Math.abs(bounds.x + bounds.width - point.x);
      }

      if (point.y > bounds.y + bounds.height) {
        result.y = bounds.y + bounds.height;
        result.height = 0;
      } else {
        result.y = Math.min(point.y, bounds.y + bounds.height);
        result.height = Math.abs(bounds.y + bounds.height - point.y);
      }
      break;
    case Side.TopRight:
      result.width = Math.max(point.x - bounds.x, 0);

      if (point.y > bounds.y + bounds.height) {
        result.y = bounds.y + bounds.height;
        result.height = 0;
      } else {
        result.y = Math.min(point.y, bounds.y + bounds.height);
        result.height = Math.abs(bounds.y + bounds.height - point.y);
      }
      break;
    case Side.BottomLeft:
      if (point.x > bounds.x + bounds.width) {
        result.x = bounds.x + bounds.width;
        result.width = 0;
      } else {
        result.x = Math.min(point.x, bounds.x + bounds.width);
        result.width = Math.abs(bounds.x + bounds.width - point.x);
      }
      result.height = Math.max(point.y - bounds.y, 0);
      break;
    case Side.BottomRight:
      result.width = Math.max(point.x - bounds.x, 0);
      result.height = Math.max(point.y - bounds.y, 0);
      break;
    default:
      break;
  }

  return result;
}
