export type CanvasState =
  | {
      mode: CanvasMode.None;
    }
  | {
      mode: CanvasMode.Pressing;
      origin: Point;
    }
  | {
      mode: CanvasMode.SelectionNet;
      origin: Point; // 選択開始時の位置x, y
      current?: Point; // 現在のカーソル位置
    }
  | {
      mode: CanvasMode.Translating;
      current?: Point;
    }
  | {
      mode: CanvasMode.Inserting;
      layerType: LayerType.Circle | LayerType.Rectangle | LayerType.Text;
      // | LayerType.Path;
    }
  | { mode: CanvasMode.Pencil }
  | {
      mode: CanvasMode.Resizing;
      initialBounds: XYWH;
      corner: Side;
    };

export enum CanvasMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  Pencil,
}

export type Color = {
  r: number;
  g: number;
  b: number;
};

export type Camera = {
  x: number;
  y: number;
};

export enum LayerType {
  Rectangle,
  Circle,
  Text,
  Path,
}

export type RectangleLayer = {
  type: LayerType.Rectangle;
  x: number;
  y: number;
  height: number;
  width: number;
  fillColor: Color;
  value?: string;
};

export type CircleLayer = {
  type: LayerType.Circle;
  x: number;
  y: number;
  height: number;
  width: number;
  fillColor: Color;
  value?: string;
};

export type TextLayer = {
  type: LayerType.Text;
  x: number;
  y: number;
  height: number;
  width: number;
  fillColor: Color;
  value?: string;
};

// export type PathLayer = {
//   type: LayerType.Path;
//   x: number;
//   y: number;
//   height: number;
//   width: number;
//   fillColor: Color;
//   points: number[][];
//   value?: string;
// };

export type Point = {
  x: number;
  y: number;
};

export type XYWH = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum Side {
  Top,
  Bottom,
  Left,
  Right,
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight,
}

// export type Layer = RectangleLayer | CircleLayer | TextLayer | PathLayer;
export type Layer = RectangleLayer | CircleLayer | TextLayer;
