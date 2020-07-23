import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Button, Form, Input } from 'antd';

import { IAddDishesCategoryProps } from './Types';

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

const { minError, requiredError } = FORM_ERRORS;

const validationSchema = Yup.object({
  category: Yup.string()
    .min(2, minError)
    .required(requiredError),
});

const AddDishesCategory: React.FC<IAddDishesCategoryProps> = ({ setModalOpen }): JSX.Element => {

  const db = firebase.firestore();

  const { errors, handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      category: '',
    },
    validateOnChange: false,
    validationSchema,
    onSubmit(values, { resetForm }) {
      const { category } = values;
      db.collection('categories').add({ category });
      setModalOpen(false);
      resetForm();
    },
  });

  const { category } = values;

  return (
    <Form {...layout} style={{ marginTop: 30 }} onSubmitCapture={handleSubmit}>
      <Form.Item 
        help={errors.category ? errors.category : ''}
        label='Категория' 
        validateStatus={errors.category ? 'error' : ''}
      >
        <Input
          onChange={handleChange}
          id="category"
          value={category}
        />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddDishesCategory;