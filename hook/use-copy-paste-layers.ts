import { MAX_LAYERS } from "@/app/canvas/[canvasId]/_components/board";
import { Layer } from "@/app/types/canvas";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { useMutation } from "@liveblocks/react";
import { useSelf } from "@liveblocks/react/suspense";
import { nanoid } from "nanoid";

export const useCopyLayers = () => {
  const selection = useSelf((me) => me.presence.selection);

  return useMutation(
    ({ storage }) => {
      const liveLayers = storage.get("layers");
      const copiedLayers = storage.get("copiedLayers");
      const copiedLayerIds = storage.get("copiedLayerIds");

      // delete previous copied layers first
      if (copiedLayers && copiedLayers.size > 0) {
        storage.set("copiedLayerIds", new LiveList([]));
        storage.set("copiedLayers", new LiveMap<string, LiveObject<Layer>>());
      }

      for (const layerId of selection) {
        const layer = liveLayers.get(layerId);
        if (layer) {
          const copiedLayer = new LiveObject(layer.toObject());
          copiedLayerIds.push(layerId);
          copiedLayers.set(layerId, copiedLayer);
        }
      }
    },
    [selection]
  );
};

export const usePasteLayers = () => {
  return useMutation(
    ({ storage, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const liveLayerIds = storage.get("layerIds");
      const copiedLayerIds = storage.get("copiedLayerIds");
      const copiedLayers = storage.get("copiedLayers");

      if (!copiedLayerIds || !copiedLayers) {
        return;
      }

      setMyPresence({ selection: [] }, { addToHistory: true });

      for (const copiedLayerId of copiedLayerIds) {
        const copiedLayer = copiedLayers.get(copiedLayerId);
        if (!copiedLayer) {
          continue;
        }

        if (liveLayers.size >= MAX_LAYERS) {
          break;
        }

        const newId = nanoid();
        const newLayerData = copiedLayer.toObject();
        const newLayer = new LiveObject(newLayerData);

        newLayer.update({
          x: newLayerData.x + 30,
          y: newLayerData.y + 30,
        });

        liveLayerIds.push(newId);
        liveLayers.set(newId, newLayer);
      }
    },
    []
  );
};
