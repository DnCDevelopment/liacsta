import React, { useState } from 'react';

import { Layout, Menu, Modal } from 'antd';
import { CompressOutlined, PlusOutlined } from '@ant-design/icons';

import AddDish from '../AddDish/AddDish';
import AddDishesCategory from '../AddDishesCategory/AddDishesCategory';
import DishesTable from '../DishesTable/DishesTable';

const { Content, Sider } = Layout;

const Dishes: React.FC = (): JSX.Element => {
  const [isCategoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [isDishModalOpen, setDishModalOpen] = useState<boolean>(false);

  return (
    <>
      <Modal
        footer={null}
        onCancel={() => setCategoryModalOpen(false)}
        visible={isCategoryModalOpen}>
        <AddDishesCategory setModalOpen={setCategoryModalOpen}/>
      </Modal>
      <Modal
        footer={null}
        onCancel={() => setDishModalOpen(false)}
        visible={isDishModalOpen}>
        <AddDish setModalOpen={setDishModalOpen}/>
      </Modal>
      <Layout>
        <Sider width={200}>
          <Menu mode='inline' style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item
              style={{
                backgroundColor: '#fff',
                color: 'rgba(0, 0, 0, 0.65)',
              }}
              key='add category'
              onClick={() => setCategoryModalOpen(true)}
            >
              <span>
                <CompressOutlined />
                <span>Добавить категорию</span>
              </span>
            </Menu.Item>
            <Menu.Item
              style={{
                backgroundColor: '#fff',
                color: 'rgba(0, 0, 0, 0.65)',
              }}
              key='add dish'
              onClick={() => setDishModalOpen(true)}
            >
              <span>
                <PlusOutlined />
                <span>Добавить блюдо</span>
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content
            className='site-layout-background'
            style={{
              margin: 0,
              minHeight: 280,
            }}>
            <DishesTable />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Dishes;