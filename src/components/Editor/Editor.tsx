import React, { useEffect, useRef, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { Group, Layer, Rect, Stage } from 'react-konva';

import Gshaped from '../Tables/GShaped';
import NShaped from '../Tables/NShaped';
import PShaped from '../Tables/PShaped';

import { Stage as StageType } from 'konva/types/Stage';

import { IPosition, ISize } from './Types';
import { IIndexedTable } from '../TableModal/Types';

const Editor: React.FC = (): JSX.Element => {
  const [{ height, width }, setStageSize] = useState<ISize>({ height: 0, width: 0 });
  const [tables, setTables] = useState<IIndexedTable[]>([]);
  const [{ x, y }, setSaloonPosition] = useState<IPosition>({ x: 0, y: 0 });

  const stageRef = useRef<StageType>(null);

  const db = firebase.firestore();

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

  useEffect(() => {
    const subscribe = db.collection('tables').onSnapshot(res => {
      setTables(res.docs.map(table => ({ ...table.data(), uid: table.id } as IIndexedTable)));
    });
    return () => {
      subscribe();
    };
  }, [db]);

  return (
    <div id="editor-canvas" style={{ width: '100%' }}>
      <Stage height={height} ref={stageRef as any} width={width}>
        <Layer id="mirror-layer">
          <Rect fill="#fff" height={200} width={400} x={x} y={y} />
          <NShaped height={15} width={30} rotation={30} x={x} y={y} />
        </Layer>
      </Stage>
    </div>
  );
};

export default Editor;
