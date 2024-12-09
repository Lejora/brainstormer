"use client"

import { LayerType, Side, XYWH } from "@/app/types/canvas";
import { useSelectionBounds } from "@/hook/use-selection-bounds";
import { useSelf, useStorage } from "@liveblocks/react/suspense";
import { memo } from "react"

interface SelectionBoxProps {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
}

const HANDLE_WIDTH = 8;

export const SelectionBox = memo(({ onResizeHandlePointerDown }: SelectionBoxProps) => {
  // when only one shape is selected, get the layer id of the shape
  const soleLayerId = useSelf((me) => me.presence.selection.length === 1
    ? me.presence.selection[0]
    : null)

  const isShowingHandles = useStorage((root) =>
    soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path)

  const bounds = useSelectionBounds();

  if (!bounds) {
    return null
  }

  return (
    <>
      <rect
        className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
        style={{
          transform: `translate(
          ${bounds.x}px, 
          ${bounds.y}px
          )`
        }}
        x={0}
        y={0}
        width={bounds.width}
        height={bounds.height}
      />
      {isShowingHandles && (
        <>
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "nw-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(
              ${bounds.x - HANDLE_WIDTH / 2}px,
              ${bounds.y - HANDLE_WIDTH / 2}px
              )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation()
              onResizeHandlePointerDown(Side.TopLeft, bounds)
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "ns-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(
              ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, 
              ${bounds.y - HANDLE_WIDTH / 2}px
              )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation()
              onResizeHandlePointerDown(Side.Top, bounds)
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "ne-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(
              ${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, 
              ${bounds.y - HANDLE_WIDTH / 2}px
              )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation()
              onResizeHandlePointerDown(Side.TopRight, bounds)
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "w-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(
              ${bounds.x - HANDLE_WIDTH / 2}px, 
              ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px
              )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation()
              onResizeHandlePointerDown(Side.Left, bounds)
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "e-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(
              ${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px
              )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation()
              onResizeHandlePointerDown(Side.Right, bounds)
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "sw-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(
              ${bounds.x - HANDLE_WIDTH / 2}px, 
              ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px
              )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation()
              onResizeHandlePointerDown(Side.BottomLeft, bounds)
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "s-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(
              ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, 
              ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px
              )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation()
              onResizeHandlePointerDown(Side.Bottom, bounds)
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "se-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(
              ${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, 
              ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px
              )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation()
              onResizeHandlePointerDown(Side.BottomRight, bounds)
            }}
          />
        </>
      )}
    </>
  )
})

SelectionBox.displayName = "SelectionBox"