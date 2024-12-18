"use client";

import { Camera, Color } from "@/app/types/canvas";
import { useSelectionBounds } from "@/hook/use-selection-bounds";
import { useMutation, useSelf } from "@liveblocks/react/suspense";
import { memo } from "react";
import { ColorPicker } from "./color-picker";
import { useDeleteLayers } from "@/hook/use-delete-layers";
import { Button } from "@/components/ui/button";
import { BringToFrontIcon, SendToBackIcon, Trash2Icon } from "lucide-react";
import { Hint } from "@/components/hint";

interface SelectionTools {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionTools) => {
    const selection = useSelf().presence.selection;

    const selectionBounds = useSelectionBounds();
    const deleteLayers = useDeleteLayers();

    const setFillColor = useMutation(
      ({ storage }, fillColor: Color) => {
        const liveLayers = storage.get("layers");

        setLastUsedColor(fillColor);

        selection.forEach((id) => {
          liveLayers.get(id)?.set("fillColor", fillColor);
        });
      },
      [selection, setLastUsedColor]
    );

    const moveToBack = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];

        const arr = liveLayerIds.toArray();

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = 0; i < indices.length; i++) {
          liveLayerIds.move(indices[i], i);
        }
      },
      [selection]
    );

    const moveToForward = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];

        const arr = liveLayerIds.toArray();

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        // back lid = [0, 1, 2, 3] front
        // indices = [0, 1]
        // lidAfter = [2, 3, 0, 1]

        for (let i = 0; i < indices.length; i++) {
          liveLayerIds.move(
            indices[i],
            arr.length - 1 - (indices.length - 1 - i)
          );
        }
      },
      [selection]
    );

    if (!selectionBounds) {
      return null;
    }

    if (selection.length < 1) {
      return;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          transform: `translate(
      calc(${x}px - 50%),
      calc(${y - 16}px - 100%))`,
        }}
      >
        <ColorPicker onChange={setFillColor} />
        <div className="flex flex-col gap-y-0.5">
          <Hint label="前方に移動">
            <Button variant="board" size="icon" onClick={moveToForward}>
              <BringToFrontIcon />
            </Button>
          </Hint>
          <Hint label="後方に移動" side="bottom">
            <Button variant="board" size="icon" onClick={moveToBack}>
              <SendToBackIcon />
            </Button>
          </Hint>
        </div>
        <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
          <Hint label="図形を消去">
            <Button variant="board" size="icon" onClick={deleteLayers}>
              <Trash2Icon className="text-red-600" />
            </Button>
          </Hint>
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";
