import React, { useState, useEffect } from 'react';
import { Form, Input, Radio, notification } from 'antd';
import { Switch, useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { BasicFormWrapper } from '../../styled';
import * as actions from '../../../redux/actions';
import * as ActionTypes from '../../../redux/ActionTypes';
import isValid from '../../../utility/isValid';

const AddAdminProjectDlg = ({ visible, onCancel, match }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { path } = match;
  const history = useHistory();

  const [state, setState] = useState({
    visible,
    modalType: 'primary',
    checked: [],
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
    let method = form.getFieldValue("method");
    if( !isValid(method) ) {
      notification['error'] ({
        message: 'Error',
        description: 'Please select the method to create new project!'
      });
      return;
    }

    dispatch({
      type: ActionTypes.SET_PROJECT_ID,
      data: null,
    });
    dispatch({
      type: ActionTypes.SET_PROJECT,
      data: null,
    });
    dispatch({
      type: ActionTypes.SET_PROJECT_ACTION,
      data: 0   // create project
    });

    dispatch({
      type: ActionTypes.SET_PROJECT_CREATE_METHOD,
      data: method
    });

    if(method === 0)
      history.push(`${path}/view/add-from-url`);
    else
      history.push(`${path}/view/add`);

    initializeFormData();
    onCancel();
  };

  const handleCancel = () => {
    initializeFormData();
    onCancel();
  };

  const initializeFormData = () => {
    form.setFieldsValue({
      ["method"]: null,
    })
  }

  return (
    <Modal
      type={state.modalType}
      title={"Create Project"}
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
          <Form form={form} name="addProject" onFinish={handleOk}>
            <Form.Item label="Please select the method" name="method">
              <Radio.Group>
                <Radio value={0}>Create the project from the Coinranking URL.</Radio> <br />
                <Radio value={1}>Fill the data manually.</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

AddAdminProjectDlg.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default AddAdminProjectDlg;
