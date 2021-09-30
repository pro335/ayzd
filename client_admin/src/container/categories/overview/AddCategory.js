import React, { useState, useEffect } from 'react';
import { Form, Input, notification } from 'antd';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { BasicFormWrapper } from '../../styled';
import * as actions from '../../../redux/actions';
import * as ActionTypes from '../../../redux/ActionTypes';

const AddCategory = ({ visible, onCancel, categoryAction = 0, categoryData = null }) => {  // categoryAction: 0: add category, 1: edit category
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    visible,
    modalType: 'primary',
    checked: [],
    initialData: {
      name: categoryAction === 0 ? "" : categoryData.name
    }
  });

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setState({
        visible,
      });
    }
    return () => {
      unmounted = true;
    };
  }, [visible]);

  const handleOk = () => {

    let name = form.getFieldValue("name");
    if( name === {} || name === null || name === "" || name === undefined ) {
      notification['error'] ({
        message: 'Error',
        description: 'Please type the name!'
      });
      return;
    }

    let newData = {
      name: name
    }

    categoryAction === 0 ?
      actions.addCategory(newData).then( res => {
        const { success, category } = res.data;
        if(success) {
          dispatch({
              type: ActionTypes.ADD_CATEGORY,
              data: category
          });

          notification['success'] ({
            message: 'New Category was created successfully',
            description: ''
          })              
        } else {
          dispatch({
              type: ActionTypes.CATEGORY_ERR,
              err: res.data.errMessage,
          });
          notification['error'] ({
            message: 'Error',
            description: res.data.errMessage
          })          
        }
      }) :
      actions.updateCategory({
        name: name,
        _id: categoryData._id
      }).then( res => {
        const { success, category } = res.data;
        if(success) {
          dispatch({
              type: ActionTypes.UPDATE_CATEGORY,
              data: category
          });

          notification['success'] ({
            message: 'Category was updated successfully',
            description: ''
          })              
        } else {
          dispatch({
              type: ActionTypes.CATEGORY_ERR,
              err: res.data.errMessage,
          });
          notification['error'] ({
            message: 'Error',
            description: res.data.errMessage
          })          
        }
      });

    onCancel();
  };

  const handleCancel = () => {
    initializeFormData();
    onCancel();
  };

  const initializeFormData = () => {
    form.setFieldsValue({
      ["name"]: null,
    })
  }

  return (
    <Modal
      type={state.modalType}
      title={categoryAction === 0 ? "Add Category" : "Update Category"}
      visible={state.visible}
      footer={[
        <div key="1">
          <Button size="default" type="white" key="back" outlined onClick={handleCancel}>
            Cancel
          </Button>
          <Button size="default" type="primary" key="submit" onClick={handleOk}>
            Save & Next
          </Button>
        </div>,
      ]}
      onCancel={handleCancel}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form form={form} name="addCategory" onFinish={handleOk} initialValues={state.initialData}>
            <Form.Item name="name" label="Name">
              <Input placeholder="Name" />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

AddCategory.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default AddCategory;
