import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Input, Select } from 'antd';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../../../styled';
import Heading from '../../../../../components/heading/heading';
import * as ActionTypes from '../../../../../redux/ActionTypes';
import isValid from '../../../../../utility/isValid';

const { Option } = Select;
const ExternalButton = () => {
  const dispatch = useDispatch();

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const [state, setState] = useState({
    initialData: {
      btn_label: project.project_action === 2 && isValid(project.projectData.btn_label) ? project.projectData.btn_label : "",
      btn_url: project.project_action === 2 && isValid(project.projectData.btn_url) ? project.projectData.btn_url : "",
    },
  });

  const handleFormData = (props, values, allFieldsValues) => {
    let newVal = {
      ...project.projectData,
      ...props
    };
    dispatch({
      type: ActionTypes.SET_PROJECT,
      data: newVal
    });
  }

  return (
    <>
      <Cards
        title={
          <div className="setting-card-title">
            <Heading as="h4">External Button</Heading>
          </div>
        }
      >
        <Row justify="center">
          <Col xs={24}>
            <BasicFormWrapper>
              <Form name="externalButton" onValuesChange={handleFormData} initialValues={state.initialData}>
                <Form.Item name="btn_label" label="Label">
                  <Input placeholder="Button's Label" />
                </Form.Item>
                <Form.Item name="btn_url" label="Link">
                  <Input placeholder="https://opensea/111" />
                </Form.Item>
              </Form>
            </BasicFormWrapper>
          </Col>
        </Row>
      </Cards>
    </>
  );
};

export default ExternalButton;
