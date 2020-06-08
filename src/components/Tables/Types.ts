import { Vector2d } from 'konva/types/types';

export interface IGshapedProps extends Vector2d {
  firstHeight: number;
  firstWidth: number;
  rotation: number;
  secondHeight: number;
  secondWidth: number;
}

export interface INshapedProps extends Vector2d {
  height: number;
  rotation: number;
  width: number;
}

export interface IPshapedProps extends Vector2d {
  firstHeight: number;
  firstWidth: number;
  rotation: number;
  secondHeight: number;
  secondWidth: number;
  thirdHeight: number;
  thirdWidth: number;
}
