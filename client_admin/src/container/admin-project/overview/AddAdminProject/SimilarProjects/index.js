import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Select } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../../components/buttons/buttons';
import { BasicFormWrapper } from '../../../../styled';
import { RowTwoComponents } from './style';
import Heading from '../../../../../components/heading/heading';
import * as ActionTypes from '../../../../../redux/ActionTypes';
import isValid from '../../../../../utility/isValid';

const { Option } = Select;
const SimilarProjects = () => {
  const dispatch = useDispatch();

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const [similarList, setSimilarList] = useState([]);

  useEffect(() => {
    let temp_similarList = [];
    if(project.project_action === 2 && isValid(project.projectData.similar_list)) {    // update project
      temp_similarList = project.projectData.similar_list;
    }
    setSimilarList(temp_similarList);
  }, []);

  const addMore = () => {
    let new_similar_list = [
      ...similarList,
      ""
    ];
    setSimilarList(new_similar_list);
    
    let newVal = {
      ...project.projectData,
      similar_list: new_similar_list,
    };
    dispatch({
      type: ActionTypes.SET_PROJECT,
      data: newVal
    });
  }

  const removeProject = (index) => {
    let new_similar_list = similarList;
    new_similar_list.splice(index, 1);

    let newVal = {
      ...project.projectData,
      similar_list: new_similar_list,
    };
    dispatch({
      type: ActionTypes.SET_PROJECT,
      data: newVal
    });
  }

  const handleProjectChange = (currentValue, index) => {
    let new_similar_list = similarList;
    new_similar_list.splice(index, 1, currentValue);

    setSimilarList(new_similar_list);

    let newVal = {
      ...project.projectData,
      similar_list: new_similar_list,
    };
    dispatch({
      type: ActionTypes.SET_PROJECT,
      data: newVal
    });
  }

  return (
    <Cards
      title={
        <div className="setting-card-title">
          <Heading as="h4">Similar projects</Heading>
        </div>
      }
    >
      <Row justify="center">
        <Col xs={24}>
          <BasicFormWrapper>
            <Form name="similarProjects">
              <Form.Item name="project" label="Project">
                { similarList.map((item, index) => (
                  <RowTwoComponents key={index}>
                    <div className="row-two-components">
                      <Select value={item._id} onChange={(currentValue) => handleProjectChange(currentValue, index)}>
                        {project.projects.map(project => (
                          <Option key={project._id} value={project._id}>{project.name}</Option>
                        ))}
                      </Select>
                      <Button className="btn-icon" onClick={() => removeProject(index)}>
                        <FeatherIcon icon="trash-2" size={16} />
                      </Button>
                    </div>
                  </RowTwoComponents>
                ))}
                <Button onClick={addMore} key="1" type="primary" size="default">
                  Add more
                </Button>
              </Form.Item>
            </Form>
          </BasicFormWrapper>
        </Col>
      </Row>
    </Cards>
  );
};

export default SimilarProjects;
