import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Input, Select } from 'antd';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../../../styled';
import * as ActionTypes from '../../../../../redux/ActionTypes';
import isValid from '../../../../../utility/isValid';

const { Option } = Select;
const ProjectInfo = () => {
  const dispatch = useDispatch();

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
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
      >
        <Row justify="center">
          <Col xs={24}>
            <BasicFormWrapper>
              <Form name="projectInfo" onValuesChange={handleFormData}>
                <Form.Item name="coinranking_url" label="Project URL">
                  <Input placeholder="https://coinranking.com/dapp/autoglyphs" />
                </Form.Item>
              </Form>
            </BasicFormWrapper>
          </Col>
        </Row>
      </Cards>
    </>
  );
};

export default ProjectInfo;
