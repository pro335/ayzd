import React, { useState, useEffect } from 'react';
import { Form, Input, notification } from 'antd';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { BasicFormWrapper } from '../../styled';
import * as actions from '../../../redux/actions';
import * as ActionTypes from '../../../redux/ActionTypes';

const AddChain = ({ visible, onCancel, chainAction = 0, chainData = null }) => {  // chainAction: 0: add chain, 1: edit chain
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    visible,
    modalType: 'primary',
    checked: [],
    initialData: {
      name: chainAction === 0 ? "" : chainData.name
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

    chainAction === 0 ?
      actions.addChain(newData).then( res => {
        const { success, chain } = res.data;
        if(success) {
          dispatch({
              type: ActionTypes.ADD_CHAIN,
              data: chain
          });

          notification['success'] ({
            message: 'New Chain was created successfully',
            description: ''
          })              
        } else {
          dispatch({
              type: ActionTypes.CHAIN_ERR,
              err: res.data.errMessage,
          });
          notification['error'] ({
            message: 'Error',
            description: res.data.errMessage
          })          
        }
      }) :
      actions.updateChain({
        name: name,
        _id: chainData._id
      }).then( res => {
        const { success, chain } = res.data;
        if(success) {
          dispatch({
              type: ActionTypes.UPDATE_CHAIN,
              data: chain
          });

          notification['success'] ({
            message: 'Chain was updated successfully',
            description: ''
          })              
        } else {
          dispatch({
              type: ActionTypes.CHAIN_ERR,
              err: res.data.errMessage,
          });
          notification['error'] ({
            message: 'Error',
            description: res.data.errMessage
          })          
        }
      });

    initializeFormData();
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
      title={chainAction === 0 ? "Add Chain" : "Update Chain"}
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
          <Form form={form} name="addChain" onFinish={handleOk} initialValues={state.initialData}>
            <Form.Item name="name" label="Name">
              <Input placeholder="Name" />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

AddChain.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default AddChain;
