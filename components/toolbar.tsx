import { ToolButton } from "@/components/tool-button"
import { PencilIcon, MousePointer2Icon, RectangleHorizontalIcon, CircleIcon, EraserIcon } from "lucide-react"
export function Toolbar() {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] right-4 flex flex-col gap-y-4">
      <div className="bg-white rounded-md shadow-md items-center flex gap-y-1 flex-col">
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
    </div>
  )
}