import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Input, Select } from 'antd';
import { Cards } from '../../../../../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../../../../../styled';
import * as actions from '../../../../../../../redux/actions';
import * as ActionTypes from '../../../../../../../redux/ActionTypes';

const Title = () => {

  /**
   * Description about the each parameters
   * 
   * guideId: the object id of media, default: "0",
   * guideAction: "create": add, "update": update, default: 1
   * 
  */

  const [form] = Form.useForm();

  const dispatch = useDispatch();
  
  const { guide } = useSelector(state => {
    return {
      guide: state.guide,
    };
  });

  const [state, setState] = useState({
    initialData: {
      title: guide.guide_action === "create" ? "" : guide.guideData.title,
    },
  });

  const handleCancel = e => {
    e.preventDefault();
    form.resetFields();
  };

  const handleFormData = (props, values, allFieldsValues) => {
    let newVal = {
      ...guide.guideData,
      ...props
    };
    dispatch({
      type: ActionTypes.SET_GUIDE,
      data: newVal
    });
  }


  return (
    <Cards headless>
      <Row justify="center">
        <Col xs={24}>
          <BasicFormWrapper>
            <Form name="title" onValuesChange={handleFormData} initialValues={state.initialData}>
              <Form.Item name="title" label="Title">
                <Input placeholder="" />
              </Form.Item>
            </Form>
          </BasicFormWrapper>
        </Col>
      </Row>
    </Cards>
  );
};

export default Title;
