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

const GShapedTable: React.FC<ITableProps> = ({ handleSave }): JSX.Element => {
  const [count, setCount] = useState<number>(2);
  const [firstHeight, setFirstHeight] = useState<number>(20);
  const [firstWidth, setFirstWidth] = useState<number>(10);
  const [rotation, setRotation] = useState<number>(0);
  const [secondHeight, setSecondHeight] = useState<number>(10);
  const [secondWidth, setSecondWidth] = useState<number>(15);

  const handleSubmit = useCallback(async () => {
    try {
      await handleSave({
        count,
        position: { x: 0, y: 0 },
        rotation,
        size: { firstHeight, firstWidth, secondHeight, secondWidth },
        type: 'GShaped',
      });
      message.success(SUCCESS_ADD_TABLE);
    } catch (err) {
      message.error(ERROR);
    }
  }, [count, firstHeight, firstWidth, rotation, secondHeight, secondWidth]);

  return (
    <>
      <Form {...layout} onFinish={handleSubmit} style={{ marginTop: 30 }}>
        <Form.Item initialValue={firstWidth} label="Ширина 1" name="firstwidth">
          <InputNumber
            min={5}
            onChange={value => setFirstWidth(value ? +value : 0)}
            placeholder="width"
            value={firstWidth}
          />
        </Form.Item>
        <Form.Item initialValue={firstHeight} label="Высота 1" name="firstheight">
          <InputNumber
            min={5}
            onChange={value => setFirstHeight(value ? +value : 0)}
            placeholder="height"
            value={firstHeight}
          />
        </Form.Item>
        <Form.Item initialValue={secondWidth} label="Ширина 2" name="secondwidth">
          <InputNumber
            min={5}
            onChange={value => setSecondWidth(value ? +value : 0)}
            placeholder="width"
            value={secondWidth}
          />
        </Form.Item>
        <Form.Item initialValue={secondHeight} label="Высота 2" name="secondheight">
          <InputNumber
            min={5}
            onChange={value => setSecondHeight(value ? +value : 0)}
            placeholder="height"
            value={secondHeight}
          />
        </Form.Item>
        <Form.Item>
          <RedoOutlined onClick={() => setRotation(rotation + 90)} style={{ fontSize: 32 }} />
          <UndoOutlined onClick={() => setRotation(rotation - 90)} style={{ fontSize: 32 }} />
        </Form.Item>
        <Form.Item initialValue={count} label="Количество" name="count">
          <InputNumber min={2} onChange={value => setCount(value ? +value : 0)} placeholder="count" value={count} />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          Добавить
        </Button>
      </Form>
      <div style={{ display: 'flex', width: 200, height: 200, marginTop: 20, background: '#f0f2f5' }}>
        <div style={{ display: 'flex', margin: 'auto', transform: `rotate(${rotation}deg)` }}>
          <div style={{ width: firstWidth, height: firstHeight, background: '#fff' }}></div>
          <div style={{ width: secondWidth, height: secondHeight, background: '#fff' }}></div>
        </div>
      </div>
    </>
  );
};

export default GShapedTable;
