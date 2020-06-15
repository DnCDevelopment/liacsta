import React, { RefObject, useCallback, useRef, useState } from 'react';

import { Group, Rect } from 'react-konva';

import { buttonDragBound, toRect } from '../../utils/dragBorders';

import { Rect as RectType } from 'konva/types/shapes/Rect';
import { IRect, Vector2d } from 'konva/types/types';

import { INshapedProps } from './Types';

import { DRAG_BORDERS } from '../../constants/DragBorders';

const NShaped: React.FC<INshapedProps> = ({ height, rotation, width, x, y }): JSX.Element => {
  const table = useRef<RectType | null>(null);
  const tableObject = table as RefObject<RectType>;
  const [bound, setBound] = useState<IRect>({ x, y, height, width });

  const maxSide = Math.max(height, width);

  const handleDrag = useCallback(
    (pos: Vector2d): Vector2d => {
      const chRect = toRect(tableObject.current as RectType, rotation);
      setBound(chRect);
      // const rotationCircle = (rotation >= 360 ? rotation - 360 : rotation).toString();
      // const border = (DRAG_BORDERS[rotationCircle] || DRAG_BORDERS[0])(height, width);
      return buttonDragBound(chRect, { height: 200, width: 400, x, y })(pos);
    },
    [height, width, rotation, x, y],
  );

  return (
    <>
      <Rect fill="transparent" height={bound.height} stroke="blue" width={bound.width} x={bound.x} y={bound.y} />
      <Group
        draggable
        dragBoundFunc={handleDrag}
        height={height}
        rotation={rotation}
        width={width}
        x={x + maxSide}
        y={y + maxSide}
      >
        <Rect
          fill="transparent"
          height={height}
          id="NSHAPED_TABLE"
          ref={table}
          stroke={undefined}
          width={width}
          x={0}
          y={0}
        />
        <Rect fill="#000" height={height} stroke={undefined} width={width} x={0} y={0} />
      </Group>
    </>
  );
};

export default NShaped;
