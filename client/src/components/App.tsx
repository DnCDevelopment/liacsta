import React from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';

import { TAppProps } from '../Types';

const { Header } = Layout;

const App: React.FC<TAppProps> = ({ children }) => (
  <Layout style={{ height: '100vh' }}>
    <Header className='header'>
      <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
        <Menu.Item key='1'>
          <Link to="/">Залы</Link>
        </Menu.Item>
        <Menu.Item key='2'>
          <Link to="/dishes">Блюда</Link>
        </Menu.Item>
      </Menu>
    </Header>
    {children}
  </Layout>
);

export default App;
