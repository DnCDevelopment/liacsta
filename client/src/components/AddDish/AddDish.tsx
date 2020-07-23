import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Button, Form, Input, InputNumber, Select } from 'antd';

import { IAddDishProps } from './Types';
import { ICategory } from '../../Types';

import { FORM_ERRORS } from '../../constants/FormErrors';

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 32 },
    sm: { span: 12 },
  },
};

const { TextArea } = Input;
const { Option } = Select;

const { minError, requiredError } = FORM_ERRORS;

const validationSchema = Yup.object({
  category: Yup.string()
    .min(2, minError)
    .required(requiredError),
  description: Yup.string()
    .min(2, minError)
    .required(requiredError),
  name: Yup.string()
    .min(2, minError)
    .required(requiredError),
  price: Yup.number()
    .required(requiredError),
});

const AddDish: React.FC<IAddDishProps> = ({ setModalOpen }): JSX.Element => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const db = firebase.firestore();

  useEffect(() => {
    const unsubscribe = db.collection('categories').onSnapshot(records => {
      const categories = records.docs.map(category => ({ id: category.id,  name: category.data()?.['category'] }));
      setCategories(categories);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const { errors, handleSubmit, handleChange, setFieldValue, values } = useFormik({
    initialValues: {
      category: '',
      description: '',
      name: '',
      price: 1,
    },
    validateOnChange: false,
    validationSchema,
    onSubmit(values, { resetForm }) {
      const { category, description, name, price } = values;
      db.collection('dishes').add({ category, description, name, price });
      setModalOpen(false);
      resetForm();
    },
  });

  const { category, description, name, price } = values;

  return (
    <Form {...layout} style={{ marginTop: 30 }} onSubmitCapture={handleSubmit}>
      <Form.Item 
        help={errors.name ? errors.name : ''}
        label='Имя' 
        validateStatus={errors.name ? 'error' : ''}
      >
        <Input
          id="name"
          onChange={handleChange}
          value={name}
        />
      </Form.Item>
      <Form.Item 
        help={errors.price ? errors.price : ''}
        label='Цена' 
        validateStatus={errors.price ? 'error' : ''}
      >
        <InputNumber
          id="price"
          min={1}
          onChange={value => setFieldValue('price', +value! as number)}
          value={price}
        />
      </Form.Item>
      <Form.Item 
        help={errors.category ? errors.category : ''}
        label='Категория' 
        validateStatus={errors.category ? 'error' : ''}
      >
        <Select onChange={value => setFieldValue('category', value)} value={category}>
          {!!categories.length && categories.map(({ id, name }) => (
            <Option key={id} value={id}>{name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Описание"
        validateStatus={errors.description ? 'error' : ''}
        help={errors.description ? errors.description : ''}
      >
        <TextArea placeholder="Описание" onChange={handleChange} id="description" value={description} />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddDish;
