import { IDragBorder } from './Types';

export const DRAG_BORDERS: IDragBorder = {
  '0': (height: number, width: number) => ({ xLeft: 0, xRight: 0, yBottom: 0, yTop: 0 }),
  '90': (height: number, width: number) => ({ xLeft: height, xRight: width, yBottom: -(width - height), yTop: 0 }),
  '180': (height: number, width: number) => ({ xLeft: width, xRight: width, yBottom: height, yTop: height }),
  '270': (height: number, width: number) => ({ xLeft: 0, xRight: width - height, yBottom: height, yTop: width }),
};
