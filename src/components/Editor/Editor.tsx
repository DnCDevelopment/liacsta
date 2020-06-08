import React, { useEffect, useRef, useState } from 'react';

import { Layer, Rect, Stage } from 'react-konva';
import { Stage as StageType } from 'konva/types/Stage';

import Gshaped from '../Tables/GShaped';
import NShaped from '../Tables/NShaped';
import PShaped from '../Tables/PShaped';

import { IPosition, ISize } from './Types';
const Editor: React.FC = (): JSX.Element => {
  const [{ height, width }, setStageSize] = useState<ISize>({ height: 0, width: 0 });
  const [{ x, y }, setSaloonPosition] = useState<IPosition>({ x: 0, y: 0 });

  const stageRef = useRef<StageType>(null);

  useEffect(() => {
    const container = document.querySelector('#container .ant-layout-content');

    const size = {
      height: container ? (container as HTMLElement).offsetHeight + 200 : window.innerHeight,
      width: container ? (container as HTMLElement).offsetWidth - 200 : window.innerWidth,
    };

    setStageSize(size);

    const saloonPosition = {
      x: size.width / 2 - 400 / 2,
      y: size.height / 2 - 200 / 2,
    };
    setSaloonPosition(saloonPosition);
  }, []);

  return (
    <div id="editor-canvas" style={{ width: '100%' }}>
      <Stage height={height} ref={stageRef as any} width={width}>
        <Layer id="mirror-layer">
          <Rect fill="#fff" height={200} width={400} x={x} y={y} />
          <Gshaped firstHeight={10} firstWidth={15} rotation={90} secondHeight={20} secondWidth={15} x={x} y={y} />
        </Layer>
      </Stage>
    </div>
  );
};

export default Editor;
