"use client"

import { Color } from "@/app/types/canvas";
import { colorToCss } from "@/lib/utils";

interface ColorPickerProps {
  onChange: (color: Color) => void
}

export function ColorPicker({ onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
      <ColorButton
        onClick={onChange}
        color={{ r: 0, g: 0, b: 0 }}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 255, g: 255, b: 255 }}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 255, g: 0, b: 0 }}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 0, g: 192, b: 0 }}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 80, g: 208, b: 255 }}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 255, g: 224, b: 32 }}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 255, g: 160, b: 16 }}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 255, g: 208, b: 160 }}
      />
    </div>
  )
}

interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color
}

const ColorButton = ({
  onClick,
  color
}: ColorButtonProps) => {
  return (
    <button
      className="w-8 h-8 flex items-center justify-center hover:opacity-75 transition"
      onClick={() => onClick(color)}
    >
      <div className="h-8 w-8 rounded-md border border-neutral-300"
        style={{ backgroundColor: colorToCss(color) }}></div>
    </button>
  )
}