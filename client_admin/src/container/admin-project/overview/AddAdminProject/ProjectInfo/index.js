import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Input, Select } from 'antd';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../../../styled';
import Heading from '../../../../../components/heading/heading';
import * as ActionTypes from '../../../../../redux/ActionTypes';
import isValid from '../../../../../utility/isValid';

const { Option } = Select;
const ProjectInfo = () => {
  const dispatch = useDispatch();

  const { categoryList, chainList, project } = useSelector(state => {
    return {
      categoryList: state.category.categories,
      chainList: state.chain.chains,
      project: state.project,
    };
  });

  const [state, setState] = useState({
    initialData: {
      name: project.project_action === 2 && isValid(project.projectData.name) ? project.projectData.name : "",
      category: project.project_action === 2 && isValid(project.projectData.category) ? project.projectData.category._id : "",
      chain: project.project_action === 2 && isValid(project.projectData.chain) ? project.projectData.chain._id : "",
      small_description: project.project_action === 2 && isValid(project.projectData.small_description) ? project.projectData.small_description : "",
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
            <Heading as="h4">Project Info</Heading>
          </div>
        }
      >
        <Row justify="center">
          <Col xs={24}>
            <BasicFormWrapper>
              <Form name="projectInfo" onValuesChange={handleFormData} initialValues={state.initialData}>
                <Form.Item name="name" label="Name">
                  <Input placeholder="Project Name" />
                </Form.Item>
                <Form.Item name="category" label="Category">
                  <Select style={{ width: '100%' }}>
                    {categoryList.map(category => (
                      <Option key={category._id} value={category._id}>{category.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="chain" label="Chain">
                  <Select style={{ width: '100%' }}>
                    {chainList.map(chain => (
                      <Option key={chain._id} value={chain._id}>{chain.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="small_description" label="Small description">
                  <Input placeholder="Lipsum" />
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
