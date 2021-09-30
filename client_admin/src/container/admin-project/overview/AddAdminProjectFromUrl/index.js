import React, { Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, useHistory } from 'react-router-dom';
import { Row, Col, Spin, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { ProjectHeader } from './style';
import { Main } from '../../../styled';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { Button } from '../../../../components/buttons/buttons';
import isValid from '../../../../utility/isValid';
import ProjectInfo from './ProjectInfo'
import * as actions from '../../../../redux/actions';
import * as ActionTypes from '../../../../redux/ActionTypes';

const AddAdminProject = ({ match }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const saveProject = async () => {

    let url = isValid(project.projectData) && isValid(project.projectData.coinranking_url) ? project.projectData.coinranking_url : "";
    if( !isValid(url) ) {
      notification['error'] ({
        message: 'Error',
        description: 'Please type the url of the NFT project!'
      });
      return;
    }

    let newData = {
      url: url
    }

    actions.addProjectFromUrl(newData).then( res => {
      const { success, project } = res.data;
      if(success) {
        dispatch({
            type: ActionTypes.ADD_PROJECT,
            data: project
        });

        notification['success'] ({
          message: 'New Project was created successfully.',
          description: ''
        })              
      } else {
        dispatch({
            type: ActionTypes.PROJECT_ERR,
            err: res.data.errMessage,
        });
        notification['error'] ({
          message: 'Error',
          description: res.data.errMessage
        })          
      }
    })

    history.goBack();
  }
  const title = (project.project_action === 0 ? "Add" : "Update") + " " + "Project";
  return (
    <>
      <ProjectHeader>
        <PageHeader
          title={title}
        />
      </ProjectHeader>
      <Main>
        <Row gutter={25}>
          <Col xs={24}>
            <div>
              <Switch>
                <Suspense
                  fallback={
                    <div className="spin">
                      <Spin />
                    </div>
                  }
                >
                  <Row gutter={25}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Row gutter={25}>
                        <Col sm={24} xs={24}>
                          <ProjectInfo />
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={24}>
                      <Button onClick={saveProject} key="1" type="primary" size="default">
                        <FeatherIcon icon="plus" size={16} /> {(project.project_action === 0 ? "Create" : "Update") + " " + "Project"}
                      </Button>
                    </Col>
                  </Row>
                </Suspense>
              </Switch>
            </div>
          </Col>
        </Row>
      </Main>
    </>
  );
};

AddAdminProject.propTypes = {
  match: propTypes.object,
};

export default AddAdminProject;
