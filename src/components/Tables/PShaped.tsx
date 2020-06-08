import React, { RefObject, useCallback, useRef } from 'react';

import { Group, Rect } from 'react-konva';
import { Rect as RectType } from 'konva/types/shapes/Rect';
import { Vector2d } from 'konva/types/types';

import { buttonDragBound, toRect } from '../../utils/dragBorders';

import { IPshapedProps } from './Types';

import { DRAG_BORDERS } from '../../constants/DragBorders';

const PShaped: React.FC<IPshapedProps> = ({
  firstHeight,
  firstWidth,
  rotation,
  secondHeight,
  secondWidth,
  thirdHeight,
  thirdWidth,
  x,
  y,
}): JSX.Element => {
  const table = useRef<RectType | null>(null);
  const tableObject = table as RefObject<RectType>;

  const maxHeight = Math.max(firstHeight, secondHeight, thirdHeight);
  const maxWidth = firstWidth + secondWidth + thirdWidth;

  const maxSide = Math.max(maxHeight, maxWidth);

  console.log(maxHeight);

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
        id="PSHAPED_TABLE"
        ref={table}
        stroke={undefined}
        width={maxWidth}
        x={0}
        y={0}
      />
      <Rect fill="#000" height={secondHeight} stroke={undefined} width={secondWidth} x={0} y={0} />
      <Rect fill="#000" height={firstHeight} stroke={undefined} width={firstWidth} x={secondWidth} y={0} />
      <Rect fill="#000" height={thirdHeight} stroke={undefined} width={thirdWidth} x={firstWidth + secondWidth} y={0} />
    </Group>
  );
};

export default PShaped;
