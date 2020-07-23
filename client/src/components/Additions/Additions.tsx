import React, { useCallback, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';

import { Layout, Menu } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import AddHall from '../AddHall/AddHall';
import Editor from '../Editor/Editor';

import Modal from 'antd/lib/modal/Modal';
import { IHall } from './Types';

const { Content, Sider } = Layout;

const Additions: React.FC = (): JSX.Element => {
  const [currentHall, setCurrentHall] = useState<IHall>({ fileName: '', id: '',  name: '' });
  const [halls, setHalls] = useState<IHall[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const db = firebase.firestore();

  useEffect(() => {
    const unsubscribe = db.collection('halls').onSnapshot(snap => {
      const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })).reverse() as IHall[];
      setHalls(data);
    });
    return () => unsubscribe();
  }, []);

  const hangleDeleteHall = useCallback(
    () => {
      db.collection('halls').doc(currentHall.id).delete();
      setCurrentHall({ fileName: '', id: '',  name: '' });
    },
    [currentHall],
  );

  return (
    <>
      <Modal
        footer={null}
        onCancel={() => setModalOpen(false)}
        visible={isModalOpen}>
        <AddHall hall={currentHall} setModalOpen={setModalOpen}/>
      </Modal>
      <Layout>
        <Sider width={200}>
          <Menu mode='inline' style={{ height: '100%', borderRight: 0 }}>
            {!!halls.length &&
              halls.map(({ fileName, id, name }) => (
                <Menu.Item key={name} onClick={() => setCurrentHall({ fileName, id, name })}>
                  <span>{name}</span>
                </Menu.Item>
              ))}
            {currentHall.id && (
              <Menu.Item onClick={() => setModalOpen(true)}>
                <span>
                  <EditOutlined />
                  <span>Изменить зал</span>
                </span>
              </Menu.Item>
              )}
            {currentHall.id && (
              <Menu.Item onClick={hangleDeleteHall}>
                <span>
                  <DeleteOutlined />
                  <span>Удалить зал</span>
                </span>
              </Menu.Item>
            )}
            <Menu.Item
              style={{
                backgroundColor: '#fff',
                color: 'rgba(0, 0, 0, 0.65)',
              }}
              key='add hall'
              onClick={() => setModalOpen(true)}
            >
              <span>
                <PlusOutlined />
                <span>Добавить зал</span>
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
            <Editor currentHall={currentHall} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Additions;
