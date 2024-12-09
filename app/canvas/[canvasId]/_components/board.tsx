"use client";

import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
  Side,
  XYWH,
} from "@/app/types/canvas";
import {
  useCanUndo,
  useCanRedo,
  useHistory,
  useMutation,
} from "@liveblocks/react";

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { useCallback, useMemo, useState } from "react";
import { CursorsPresence } from "./cursors-presence";
import { connectionIdToColor, pointerEventToCanvasPoint, resizeBounds } from "@/lib/utils";
import { useOthersMapped, useStorage } from "@liveblocks/react/suspense";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import { SelectionBox } from "./selection-box";

const MAX_LAYERS = 100;

interface BoardProps {
  canvasId: string;
}

export function Board({ canvasId }: BoardProps) {
  const layerIds = useStorage((root) => root.layerIds);

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 255,
    g: 255,
    b: 255,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType: LayerType.Circle | LayerType.Rectangle | LayerType.Text | LayerType.Path,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }
      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fillColor: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor]
  );

  const translateSelectedLayers = useMutation((
    { storage, self },
    point: Point) => {
    if (canvasState.mode !== CanvasMode.Translating) {
      return;
    }

    if (!canvasState.current) {
      return;
    }

    const offset = {
      x: point.x - canvasState.current.x,
      y: point.y - canvasState.current.y
    }

    const liveLayers = storage.get("layers")

    for (const id of self.presence.selection) {
      const layer = liveLayers.get(id)

      if (layer) {
        layer.update({
          x: layer.get("x") + offset.x,
          y: layer.get("y") + offset.y
        })
      }
    }

    setCanvasState({ mode: CanvasMode.Translating, current: point })

  }, [canvasState])

  const unselectLayer = useMutation((
    { self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true })
    }
  }, [])

  const resizeSelectedLayer = useMutation((
    { storage, self },
    point: Point) => {
    if (canvasState.mode !== CanvasMode.Resizing) {
      return;
    }

    const bounds = resizeBounds(canvasState.initialBounds, canvasState.corner, point)

    const liveLayers = storage.get("layers")
    const layer = liveLayers.get(self.presence.selection[0])
    if (layer) {
      layer.update(bounds)
    }
  }, [canvasState])

  const onResizeHandlePointerDown = useCallback((
    corner: Side,
    initialBounds: XYWH
  ) => {
    history.pause()
    setCanvasState({
      mode: CanvasMode.Resizing,
      corner,
      initialBounds
    })
  }, [history])

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current)
      }

      else if (canvasState.mode === CanvasMode.Translating) {
        translateSelectedLayers(current)
      }

      setMyPresence({ cursor: current });
    },
    [canvasState, camera, resizeSelectedLayer, translateSelectedLayers]
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onPointerUp = useMutation(
    ({ }, e) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Pressing) {
        unselectLayer()
        setCanvasState({ mode: CanvasMode.None })
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }

      history.resume();
    },
    [camera, canvasState, history, insertLayer, insertLayer]
  );

  const onPointerDown = useCallback((
    e: React.PointerEvent
  ) => {
    const point = pointerEventToCanvasPoint(e, camera);
    if (canvasState.mode === CanvasMode.Inserting) {
      return;
    }

    // TODO: add case for drawing

    setCanvasState({ origin: point, mode: CanvasMode.Pressing })
  }, [camera, canvasState.mode, setCanvasState])

  const onLayerPointerDown = useMutation((
    { self, setMyPresence },
    e: React.PointerEvent,
    layerId: string,
  ) => {
    // only when "selected" mode is selected, this func fires
    if (canvasState.mode === CanvasMode.Pencil
      || canvasState.mode === CanvasMode.Inserting) {
      return;
    }

    history.pause()
    e.stopPropagation()

    const point = pointerEventToCanvasPoint(e, camera)

    // when "on pointer shape" is not selected yet, make it selected
    if (!self.presence.selection.includes(layerId)) {
      setMyPresence({ selection: [layerId] }, { addToHistory: true })
    }

    // translate shape
    setCanvasState({ mode: CanvasMode.Translating, current: point })
  }, [setCanvasState, camera, history, canvasState.mode])

  const selection = useOthersMapped((other) => other.presence.selection);

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};
    for (const user of selection) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
      }
    }

    return layerIdsToColorSelection;
  }, [selection]);

  return (
    <main className="h-screen w-full relative bg-neutral-100 touch-none">
      <Info canvasId={canvasId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
      >
        <g transform={`translate(${camera.x}, ${camera.y})`}>
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          <SelectionBox
            onResizeHandlePointerDown={onResizeHandlePointerDown}
          />
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
}
