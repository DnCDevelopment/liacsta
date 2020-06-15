import React, { useCallback, useState } from 'react';

import { Button, Form, InputNumber, message } from 'antd';

import { RedoOutlined, UndoOutlined } from '@ant-design/icons';

import { ITableProps } from './Types';

import { ERROR, SUCCESS_ADD_TABLE } from '../../constants/Messages';

const layout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 16,
  },
};

const NormalTable: React.FC<ITableProps> = ({ handleSave, setModalOpen }): JSX.Element => {
  const [count, setCount] = useState<number>(2);
  const [height, setHeight] = useState<number>(10);
  const [rotation, setRotation] = useState<number>(0);
  const [width, setWidth] = useState<number>(10);

  const handleSubmit = useCallback(async () => {
    try {
      await handleSave({
        count,
        position: { x: 0, y: 0 },
        rotation: rotation < 0 ? 360 + rotation : rotation,
        size: { firstHeight: height, firstWidth: width },
        type: 'NShaped',
      });
      setModalOpen(false);
      message.success(SUCCESS_ADD_TABLE);
    } catch (err) {
      message.error(ERROR);
    }
  }, [count, height, width]);

  console.log(count);

  return (
    <>
      <Form {...layout} onFinish={handleSubmit} style={{ marginTop: 30 }}>
        <Form.Item initialValue={width} label="Ширина" name="width">
          <InputNumber min={5} onChange={value => setWidth(value ? +value : 5)} placeholder="width" value={width} />
        </Form.Item>
        <Form.Item initialValue={height} label="Высота" name="height">
          <InputNumber min={5} onChange={value => setHeight(value ? +value : 5)} placeholder="height" value={height} />
        </Form.Item>
        <Form.Item>
          <RedoOutlined onClick={() => setRotation(rotation + 90)} style={{ fontSize: 32 }} />
          <UndoOutlined onClick={() => setRotation(rotation - 90)} style={{ fontSize: 32 }} />
        </Form.Item>
        <Form.Item initialValue={count} label="Количество" name="count">
          <InputNumber min={2} onChange={value => setCount(value ? +value : 2)} placeholder="count" value={count} />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          Добавить
        </Button>
      </Form>
      <div style={{ display: 'flex', width: 200, height: 200, marginTop: 20, background: '#f0f2f5' }}>
        <div
          style={{ width, height, margin: 'auto', background: '#ffffff', transform: `rotate(${rotation}deg)` }}
        ></div>
      </div>
    </>
  );
};

export default NormalTable;
