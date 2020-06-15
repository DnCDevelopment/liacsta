import React, { RefObject, useCallback, useRef } from 'react';

import { Group, Rect } from 'react-konva';

import { buttonDragBound, toRect } from '../../utils/dragBorders';

import { Rect as RectType } from 'konva/types/shapes/Rect';
import { Vector2d } from 'konva/types/types';

import { IGshapedProps } from './Types';

import { DRAG_BORDERS } from '../../constants/DragBorders';

const GShaped: React.FC<IGshapedProps> = ({
  firstHeight,
  firstWidth,
  rotation,
  secondHeight,
  secondWidth,
  x,
  y,
}): JSX.Element => {
  const table = useRef<RectType | null>(null);
  const tableObject = table as RefObject<RectType>;

  const maxHeight = Math.max(firstHeight, secondHeight);
  const maxWidth = firstWidth + secondWidth;

  const maxSide = Math.max(maxHeight, maxWidth);

  const handleDrag = useCallback(
    (pos: Vector2d): Vector2d => {
      const chRect = toRect(tableObject.current as RectType);
      const rotationCircle = (rotation >= 360 ? rotation - 360 : rotation).toString();
      const border = DRAG_BORDERS[rotationCircle](maxHeight, maxWidth);
      return buttonDragBound(chRect, { height: 200, width: 400, x, y }, border)(pos);
    },
    [maxHeight, maxWidth, rotation, x, y],
  );

  return (
    <Group
      draggable
      dragBoundFunc={handleDrag}
      height={maxHeight}
      rotation={rotation}
      width={maxWidth}
      x={x + maxSide}
      y={y + maxSide}
    >
      <Rect
        fill="transparent"
        height={maxHeight}
        id="GSHAPED_TABLE"
        ref={table}
        stroke={undefined}
        width={maxWidth}
        x={0}
        y={0}
      />
      <Rect fill="#000" height={firstHeight} stroke={undefined} width={firstWidth} x={0} y={0} />
      <Rect fill="#000" height={secondHeight} stroke={undefined} width={secondWidth} x={firstWidth} y={0} />
    </Group>
  );
};

export default GShaped;
