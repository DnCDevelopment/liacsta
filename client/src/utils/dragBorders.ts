import { Circle as CircleType } from 'konva/types/shapes/Circle';
import { IRect, Vector2d } from 'konva/types/types';

import { IBorder } from '../constants/Types';

export const buttonDragBound = (
  child: IRect,
  container: IRect,
  border: IBorder = { xLeft: 0, xRight: 0, yBottom: 0, yTop: 0 },
) => (pos: Vector2d): Vector2d => {
  let x = pos.x;
  let y = pos.y;
  const rightBnd = container.x + container.width;
  const bottomBnd = container.y + container.height;

  if (x - child.width / 2 < container.x) {
    x = container.x + child.width / 2;
  } else if (x > rightBnd - child.width / 2) {
    x = rightBnd - child.width / 2;
  }

  if (y - child.height / 2 < container.y) {
    y = container.y + child.height / 2;
  } else if (y > bottomBnd - child.height / 2) {
    y = bottomBnd - child.height / 2;
  }

  return { x, y };
};

export const toCircle = (shape: CircleType): IRect => {
  const pos = shape.getAbsolutePosition();
  const height = shape.height();
  const width = shape.width();
  const { x, y } = pos;
  return {
    height: height,
    width: width,
    x: x,
    y: y,
  };
};
