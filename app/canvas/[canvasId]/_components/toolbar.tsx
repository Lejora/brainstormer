import { ToolButton } from "@/app/canvas/[canvasId]/_components/tool-button"
import { PencilIcon, MousePointer2Icon, RectangleHorizontalIcon, CircleIcon, EraserIcon, UndoIcon, RedoIcon } from "lucide-react"
export function Toolbar() {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] right-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md shadow-md items-center flex gap-y-1 flex-col p-1.5">
        <ToolButton
          label="Select"
          icon={MousePointer2Icon}
          onClick={() => { }}
        />
        <ToolButton
          label="Pen"
          icon={PencilIcon}
          onClick={() => { }}
        />
        <ToolButton
          label="Rectangle"
          icon={RectangleHorizontalIcon}
          onClick={() => { }}
        />
        <ToolButton
          label="Circle"
          icon={CircleIcon}
          onClick={() => { }}
        />
        <ToolButton
          label="Erase"
          icon={EraserIcon}
          onClick={() => { }}
        />
      </div>
      <div className="bg-white rounded-md shadow-md p-1.5 flex flex-col items-center space-y-1">
        <ToolButton
          label="Undo"
          icon={UndoIcon}
          onClick={() => { }}
        />
        <ToolButton
          label="Redo"
          icon={RedoIcon}
          onClick={() => { }}
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