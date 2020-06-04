import React, { useRef } from 'react';
import { Layer, Stage } from 'react-konva';
import { Stage as StageType } from 'konva/types/Stage';

const Editor: React.FC = (): JSX.Element => {
  const stageRef = useRef<StageType>(null);
  return (
    <div id='editor-canvas' style={{ width: '100%' }}>
      <Stage
        height={window.innerHeight}
        ref={stageRef as any}
        width={window.innerWidth}>
        <Layer id='mirror-layer' height={800} width={800}></Layer>
      </Stage>
    </div>
  );
};

export default Editor;
