import { Rect as RectType } from 'konva/types/shapes/Rect';
import { Vector2d, IRect } from 'konva/types/types';

import { IBorder } from '../constants/Types';

export const buttonDragBound = (
  child: IRect,
  container: IRect,
  border: IBorder = { xLeft: 0, xRight: 0, yBottom: 0, yTop: 0 },
) => (pos: Vector2d): Vector2d => {
  let { x } = pos;
  let { y } = pos;
  const rightBnd = container.x + container.width - child.width;
  const bottomBnd = container.y + container.height - child.height;

  if (x < container.x + border.xLeft) {
    x = container.x + border.xLeft;
  } else if (x > rightBnd + border.xRight) {
    x = rightBnd + border.xRight;
  }

  if (y < container.y + border.yTop) {
    y = container.y + border.yTop;
  } else if (y > bottomBnd + border.yBottom) {
    y = bottomBnd + border.yBottom;
  }

  return { x, y };
};

export const toRect = (shape: RectType): IRect => {
  const pos = shape.getAbsolutePosition();
  return {
    x: pos.x,
    y: pos.y,
    width: shape.width(),
    height: shape.height(),
  };
};
