import React, { useCallback } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { Modal } from 'antd';

import GShapedTable from '../TableForm/GShapedTable';
import PShapedTable from '../TableForm/PShapedTable';
import NormalTable from '../TableForm/NormalTable';

import { ITable, ITableModalProps } from './Types';

const TableModal: React.FC<ITableModalProps> = ({ isModalOpen, setModalOpen, tableType }): JSX.Element => {
  const db = firebase.firestore();

  const handleSave = useCallback(async ({ count, position, rotation, size, type }: ITable) => {
    return await db.collection('tables').add({ count, position, rotation, size, type });
  }, []);

  const tables = {
    GShaped: GShapedTable,
    PShaped: PShapedTable,
    NShaped: NormalTable,
  };

  const Table = tables[tableType || 'NShaped'];

  return (
    <Modal
      bodyStyle={{ display: 'flex', justifyContent: 'space-between' }}
      footer={null}
      onCancel={() => setModalOpen(false)}
      visible={isModalOpen}
    >
      <Table handleSave={handleSave} />
    </Modal>
  );
};

export default TableModal;
