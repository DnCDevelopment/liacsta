import React, { useCallback, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { Button, Form, Input, message, Upload } from 'antd';

import { UploadFile } from 'antd/lib/upload/interface';

import { IAddHallProps } from './Types';

const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 16,
  },
};

const AddHall: React.FC<IAddHallProps> = ({ setModalOpen, hall: { id, name } }): JSX.Element => {
  const [hallName, setHallName] = useState<string>(name ?? 'Зал');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const db = firebase.firestore();

  const handleChange = useCallback(info => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
    setFileList([info.fileList[info.fileList.length - 1]]);
  }, []);

  const handleSubmit = useCallback(async () => {
    const data = new FormData();
    data.append('file', fileList[0].originFileObj as string | Blob);
    try {
      const res = await fetch('http://localhost:3200/upload', {
        method: 'POST',
        body: data,
      });
      const { name } = await res.json();
      if (id) {
        await db.collection('halls').doc(id).update({ fileName: name.replace('.svg', ''), name: hallName });
      } else {
        await db.collection('halls').add({ fileName: name.replace('.svg', ''), name: hallName });
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  }, [fileList, hallName, id]);

  return (
    <Form {...layout} style={{ marginTop: 30 }} onFinish={handleSubmit}>
      <Form.Item label='Зал'>
        <Input
          onChange={e => setHallName(e.currentTarget.value)}
          value={hallName}
        />
      </Form.Item>
      <Form.Item>
        <Upload
          fileList={fileList}
          multiple={false}
          onChange={handleChange}
          action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          headers={{
            authorization: 'authorization-text',
          }}
          // beforeUpload={handleUpload}
          name='file'
        >
          <Button style={{ marginBottom: 30 }}>Завантажити</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddHall;
