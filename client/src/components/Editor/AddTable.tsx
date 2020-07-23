import React, { useCallback, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { Button, Form, InputNumber, Modal } from 'antd';

import { IAddTableProps } from './Types';

const layout = {
  labelCol: {
    span: 7,
    style: { display: 'flex' }
  },
  wrapperCol: {
    span: 16,
  },
};

const AddTable: React.FC<IAddTableProps> = ({ currentHall: { fileName, id }, isModalOpen, setModalOpen, table }): JSX.Element => {
  const [tableNumber, setTableNumber] = useState<number>(1);
  const [count, setCount] = useState<number>(1);

  const db = firebase.firestore();
  const tableId = table?.getAttribute('data-id'); 

  const sendNewHall = useCallback(
    async (hall) => {
      try {
        await fetch(`http://localhost:3200/halls/${fileName}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          body: JSON.stringify({ hall }),
        });
      } catch (err) {
        console.error(err);
      }
    },
    [fileName],
  );

  const handleCancel = useCallback(
    () => {
      setModalOpen(false);
      setTableNumber(1);
      setCount(1);
    },
    [],
  );

  const handleDelete = useCallback((tableId: string) => {
    db.collection('tables').doc(tableId).delete();
    table?.removeAttribute('data-id');
    setModalOpen(false);
  }, [table]);

  const handleSubmit = useCallback(
    async () => {
      if (table) {
        const tableData = { 
          hall: db.collection('halls').doc(id), 
          number: tableNumber.toString(), 
          peopleCount: count 
        };
        try {
          if (tableId) {
            await db.collection('tables').doc(tableId).update(tableData);
          } else {
            const { id: newTableId } = await db.collection('tables').add(tableData);
            table.setAttribute('data-id', newTableId.toString());
          }
          sendNewHall(document.querySelector('#Слой_1')?.outerHTML);
        } catch(err) {
          console.error(err);
        }
      }
      handleCancel();
    },
    [count, table, tableId, tableNumber],
  );

  const setInputsData = useCallback(
    async (tableId: string | null | undefined) => {
      if (tableId) {
        const data = (await db.collection('tables').doc(tableId).get()).data();
        setTableNumber(+data?.['number']);
        setCount(+data?.['peopleCount']);
      }
    },
    [],
  );

  useEffect(() => {
    setInputsData(tableId);
  }, [tableId]);

  return (
    <Modal
      footer={null}
      onCancel={handleCancel}
      visible={isModalOpen}
    >
      <Form {...layout} onFinish={handleSubmit} style={{ marginTop: 30 }}>
        <Form.Item label='Номер'>
          <InputNumber
            min={1}
            onChange={value => setTableNumber(value as number)}
            value={tableNumber}
          />
        </Form.Item>
        <Form.Item label='Количество мест'>
          <InputNumber
            min={1}
            onChange={value => setCount(value as number)}
            value={count}
          />
        </Form.Item>
        {tableId && <Form.Item>
          <Button onClick={() => handleDelete(tableId)} type='default'>
            Удалить стол
          </Button>
        </Form.Item>}
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTable;