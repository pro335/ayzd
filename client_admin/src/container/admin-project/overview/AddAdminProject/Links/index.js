import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Input } from 'antd';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../../../styled';
import Heading from '../../../../../components/heading/heading';
import * as ActionTypes from '../../../../../redux/ActionTypes';
import isValid from '../../../../../utility/isValid';

const Links = () => {

  const dispatch = useDispatch();
  
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const [state, setState] = useState({
    initialData: {
      app_link: project.project_action === 2 && isValid(project.projectData.app_link) ? project.projectData.app_link : "",
      twitter_link: project.project_action === 2 && isValid(project.projectData.twitter_link) ? project.projectData.twitter_link : "",
      telegram_link: project.project_action === 2 && isValid(project.projectData.telegram_link) ? project.projectData.telegram_link : "",
      discord_link: project.project_action === 2 && isValid(project.projectData.discord_link) ? project.projectData.discord_link : "",
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
    <Cards
      title={
        <div className="setting-card-title">
          <Heading as="h4">Links</Heading>
        </div>
      }
    >
      <Row justify="center">
        <Col xs={24}>
          <BasicFormWrapper>
            <Form name="links" onValuesChange={handleFormData} initialValues={state.initialData}>
              <Form.Item name="app_link" label="Link to app">
                <Input placeholder="link.com" />
              </Form.Item>
              <Form.Item name="twitter_link" label="Twitter">
                <Input placeholder="link.com" />
              </Form.Item>
              <Form.Item name="telegram_link" label="Telegram">
                <Input placeholder="link.com" />
              </Form.Item>
              <Form.Item name="discord_link" label="Discord">
                <Input placeholder="link.com" />
              </Form.Item>
            </Form>
          </BasicFormWrapper>
        </Col>
      </Row>
    </Cards>
  );
};

export default Links;
