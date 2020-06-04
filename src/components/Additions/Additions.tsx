import React, { useCallback, useState } from 'react';

import { Layout, Menu } from 'antd';

import TableModal from '../TableModal/TableModal';

import { ITableOptions } from '../TableModal/Types';

const { Header, Content, Sider } = Layout;

const Additions: React.FC = (): JSX.Element => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [tableType, setTableType] = useState<keyof ITableOptions>('NShaped');

  const handleAddTable = useCallback(({ key }) => {
    setTableType(key);
    setModalOpen(true);
  }, []);

  return (
    <>
      <TableModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} tableType={tableType} />
      <Layout style={{ height: '100vh' }}>
        <Header className="header">
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Залы</Menu.Item>
            <Menu.Item key="2">Блюда</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200}>
            <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
              <Menu.Item
                style={{
                  backgroundColor: '#fff',
                  color: 'rgba(0, 0, 0, 0.65)',
                }}
                onClick={handleAddTable}
                key="GShaped"
              >
                Г образный
              </Menu.Item>
              <Menu.Item
                style={{
                  backgroundColor: '#fff',
                  color: 'rgba(0, 0, 0, 0.65)',
                }}
                onClick={handleAddTable}
                key="PShaped"
              >
                П образный
              </Menu.Item>
              <Menu.Item
                style={{
                  backgroundColor: '#fff',
                  color: 'rgba(0, 0, 0, 0.65)',
                }}
                onClick={handleAddTable}
                key="NShaped"
              >
                Обычный
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px', margin: '16px 0' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Additions;
