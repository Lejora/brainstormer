"use client"

import { Camera, Color } from "@/app/types/canvas";
import { useSelectionBounds } from "@/hook/use-selection-bounds";
import { useMutation, useSelf } from "@liveblocks/react/suspense";
import { memo } from "react";
import { ColorPicker } from "./color-picker";
import { useDeleteLayers } from "@/hook/use-delete-layers";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { Hint } from "@/components/hint";

interface SelectionTools {
  camera: Camera
  setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(({
  camera,
  setLastUsedColor
}: SelectionTools) => {

  const selection = useSelf().presence.selection

  const selectionBounds = useSelectionBounds()
  const deleteLayers = useDeleteLayers()

  const setFillColor = useMutation((
    { storage },
    fillColor: Color
  ) => {
    const liveLayers = storage.get("layers")

    setLastUsedColor(fillColor)

    selection.forEach((id) => {
      liveLayers.get(id)?.set("fillColor", fillColor)
    })
  }, [selection, setLastUsedColor])

  if (!selectionBounds) {
    return null;
  }

  if (selection.length < 1) {
    return;
  }

  const x = selectionBounds.width / 2 + selectionBounds.x + camera.x
  const y = selectionBounds.y + camera.y

  return (
    <div className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none" style={{
      transform: `translate(
      calc(${x}px - 50%),
      calc(${y - 16}px - 100%))`
    }}>
      <ColorPicker
        onChange={setFillColor}
      />
      <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
        <Hint label="図形を消去">
          <Button
            variant="board"
            size="icon"
            onClick={deleteLayers}
          >
            <Trash2Icon className="text-red-600" />
          </Button>
        </Hint>
      </div>
    </div>
  )
})

SelectionTools.displayName = "SelectionTools"