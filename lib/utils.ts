import {
  Camera,
  Color,
  Layer,
  LayerType,
  PathLayer,
  Point,
  Side,
  XYWH,
} from "@/app/types/canvas";
import { clsx, type ClassValue } from "clsx";
import { FileX2, X } from "lucide-react";
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

export function findIntersectingLayers(
  layerIds: readonly string[],
  layers: ReadonlyMap<string, Layer>,
  a: Point,
  b: Point
): string[] {
  const rect = {
    // x, y -> top left
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  };

  const ids: string[] = [];

  for (const layerId of layerIds) {
    const layer = layers.get(layerId);

    if (layer == null) {
      continue;
    }

    const { x, y, width, height } = layer;

    if (
      rect.x + rect.width > x &&
      rect.x < x + width &&
      rect.y + rect.height > y &&
      rect.y < y + height
    ) {
      ids.push(layerId);
    }
  }

  return ids;
}

export function getContrastingTextColor(color: Color) {
  const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;

  return luminance > 182 ? "black" : "white";
}

export function penPointsToLayer(points: number[][], color: Color): PathLayer {
  if (points.length < 2) {
    throw new Error("Cannot transform points with less than 2 points");
  }
  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;

    if (left > x) {
      left = x;
    }

    if (top > y) {
      top = y;
    }

    if (right < x) {
      right = x;
    }

    if (bottom < y) {
      bottom = y;
    }
  }

  return {
    type: LayerType.Path,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fillColor: color,
    points: points.map(([x, y, pressure]) => [x - left, y - top, pressure]),
  };
}

export function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
}
