import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Input, Select, DatePicker } from 'antd';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../../../styled';
import Heading from '../../../../../components/heading/heading';
import * as ActionTypes from '../../../../../redux/ActionTypes';
import isValid from '../../../../../utility/isValid';

const { Option } = Select;
const Score = () => {
  const dispatch = useDispatch();

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const [state, setState] = useState({
    initialData: {
      score_team: project.project_action === 2 && isValid(project.projectData.score_team) ? project.projectData.score_team : 0,
      score_uniqueness: project.project_action === 2 && isValid(project.projectData.score_uniqueness) ? project.projectData.score_uniqueness : 0,
      score_community: project.project_action === 2 && isValid(project.projectData.score_community) ? project.projectData.score_community : 0,
      score_v_quality: project.project_action === 2 && isValid(project.projectData.score_v_quality) ? project.projectData.score_v_quality : 0,
      score_v_potential: project.project_action === 2 && isValid(project.projectData.score_v_potential) ? project.projectData.score_v_potential : 0,
      score_utility: project.project_action === 2 && isValid(project.projectData.score_utility) ? project.projectData.score_utility : 0,
    },
  });

  const handleFormData = (props, values, allFieldsValues) => {
    if(isValid(props) && isValid(Object.keys(props)) && isValid(Object.keys(props)[0]) && isValid(Object.values(props)) && isValid(Object.values(props)[0])) {
      let key = Object.keys(props)[0], value = Object.values(props)[0];
      if(key === "price" || key === "mint_size") {
        let tempValue = value;
        value = Number(tempValue);
      }
      let newVal = {
        ...project.projectData,
        [key]: value,
      };
      dispatch({
        type: ActionTypes.SET_PROJECT,
        data: newVal
      });
    }
  }

  return (
    <>
      <Cards
        title={
          <div className="setting-card-title">
            <Heading as="h4">Project Score</Heading>
          </div>
        }
      >
        <Row justify="center">
          <Col xs={24}>
            <BasicFormWrapper>
              <Form name="score" onValuesChange={handleFormData} initialValues={state.initialData}>
                <Form.Item name="score_team" label="Team">
                  <Input type="number" />
                </Form.Item>
                <Form.Item name="score_community" label="Community">
                  <Input type="number" />
                </Form.Item>
                <Form.Item name="score_uniqueness" label="Uniqueness">
                  <Input type="number" />
                </Form.Item>
                <Form.Item name="score_utility" label="Utility">
                  <Input type="number" />
                </Form.Item>
                <Form.Item name="score_v_quality" label="Visual quality">
                  <Input type="number" />
                </Form.Item>
                <Form.Item name="score_v_potential" label="Viral Potential">
                  <Input type="number" />
                </Form.Item>
              </Form>
            </BasicFormWrapper>
          </Col>
        </Row>
      </Cards>
    </>
  );
};

export default Score;
