import { Rect as RectType } from 'konva/types/shapes/Rect';
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

  console.log(child.x, x - child.width / 2, child.width);
  // console.log(x, y);

  if (x - child.width / 2 < container.x) {
    x = container.x + child.width / 2;
  } else if (x > rightBnd - child.width / 2) {
    x = rightBnd - child.width / 2;
  }

  if (y < container.y) {
    y = container.y;
  } else if (y > bottomBnd - child.height) {
    y = bottomBnd - child.height;
  }

  console.log(x);

  return { x, y };
};

export const toRect = (shape: RectType, rotation = 0): IRect => {
  const pos = shape.getAbsolutePosition();
  const height = shape.height();
  const width = shape.width();
  const { x, y } = pos;
  return {
    height: height * Math.sin(((90 - rotation) * Math.PI) / 180) + width * Math.cos(((90 - rotation) * Math.PI) / 180),
    width: width * Math.cos((rotation * Math.PI) / 180) + height * Math.cos(((90 - rotation) * Math.PI) / 180),
    x: x - height * Math.cos(((90 - rotation) * Math.PI) / 180),
    y: y,
  };
};
