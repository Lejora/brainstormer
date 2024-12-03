import { ToolButton } from "@/app/canvas/[canvasId]/_components/tool-button"
import { CanvasMode, CanvasState, LayerType } from "@/app/types/canvas";
import { PencilIcon, MousePointer2Icon, RectangleHorizontalIcon, CircleIcon, EraserIcon, UndoIcon, RedoIcon, TypeIcon } from "lucide-react"

interface ToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function Toolbar({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo
}: ToolbarProps
) {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] right-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md shadow-md items-center flex gap-y-1 flex-col p-1.5">
        <ToolButton
          label="選択"
          icon={MousePointer2Icon}
          onClick={() => setCanvasState({ mode: CanvasMode.None })}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
        />
        <ToolButton
          label="テキスト"
          icon={TypeIcon}
          onClick={() => setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Text
          })}
          isActive={canvasState.mode === CanvasMode.Inserting
            && canvasState.layerType === LayerType.Text}
        />
        <ToolButton
          label="ペン"
          icon={PencilIcon}
          onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
          isActive={canvasState.mode === CanvasMode.Pencil}
        />
        <ToolButton
          label="四角形"
          icon={RectangleHorizontalIcon}
          onClick={() => setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Rectangle
          })}
          isActive={canvasState.mode === CanvasMode.Inserting
            && canvasState.layerType === LayerType.Rectangle
          }
        />
        <ToolButton
          label="円"
          icon={CircleIcon}
          onClick={() => setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Circle
          })}
          isActive={canvasState.mode === CanvasMode.Inserting
            && canvasState.layerType === LayerType.Circle
          }
        />
        <ToolButton
          label="消しゴム"
          icon={EraserIcon}
          onClick={() => { }}
        />
      </div>
      <div className="bg-white rounded-md shadow-md p-1.5 flex flex-col items-center space-y-1">
        <ToolButton
          label="取り消し(Undo)"
          icon={UndoIcon}
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          label="やり直し(Redo)"
          icon={RedoIcon}
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  )
}

export function ToolbarSkeleton() {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] right-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md">
    </div>
  )
}