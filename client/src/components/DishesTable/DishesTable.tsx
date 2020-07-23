import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { Tabs } from 'antd';

import CategoryDishes from './CategoryDishes';

import { ICategory } from '../../Types';

const { TabPane } = Tabs;

const DishesTable: React.FC = (): JSX.Element => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const db = firebase.firestore();

  useEffect(() => {
    const unsubscribe = db.collection('categories').onSnapshot(records => {
      const categoties = records.docs.map(category => ({ id: category.id,  name: category.data()?.['category'] }));
      setCategories(categoties);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Tabs onChange={undefined} style={{ marginLeft: 30 }}>
      {!!categories.length && categories.map(({ id, name }) => (
        <TabPane key={id} tab={name}>
          <CategoryDishes id={id}/>
        </TabPane>
      ))}
    </Tabs>
  );
};

export default DishesTable;