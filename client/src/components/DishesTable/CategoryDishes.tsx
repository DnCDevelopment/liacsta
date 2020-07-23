import React, { useCallback, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { Table } from 'antd';

import { DeleteOutlined } from '@ant-design/icons';

import { ICategoryDishesProps } from './Types';
import { IDish } from '../../Types';

const { Column } = Table;

const CategoryDishes: React.FC<ICategoryDishesProps> = ({ id }): JSX.Element => {
  const [dishes, setDishes] = useState<IDish[]>([]);

  const db = firebase.firestore();

  const handleDelete = useCallback((key: string) => {
    console.log(key);
    db.collection('dishes').doc(key).delete();
  }, []);

  useEffect(() => {
    const unsubscribe = db
    .collection('dishes')
    .where('category', '==', id)
    .onSnapshot(records => {
      const dishes = records.docs.map((record) => ({  
          category: record.data()?.['category'],
          description: record.data()?.['description'],
          key: record.id,
          name: record.data()?.['name'],
          price: record.data()?.['price'],
      }), []);
      setDishes(dishes);
    });
    return () => {
      unsubscribe();
    };
  }, [id]);

  return (
    <Table dataSource={dishes}>
      <Column dataIndex='name' key='name' title='Имя'/>
      <Column dataIndex='price' key='price' title='Цена'/>
      <Column
        title="Удалить"
        key="delete"
        render={(_, { key }: IDish) => (
          <DeleteOutlined onClick={() => handleDelete(key)}/>
        )}
    />
    </Table>
  );
};

export default CategoryDishes;