import React, { Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Spin, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Switch, useHistory } from 'react-router-dom';
import { ProjectHeader } from './style';
import { Main } from '../../../styled';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { CustomButton } from '../../../../components/custom-button';
import AboutProject from './AboutProject';
import MainImageTableData from './main-image-table-data';
import NewsfeedSourcesTableData from './newsfeed-sources-table-data';
import ProjectTeamTableData from './project-team-table-data';
import MediaTableData from './media-table-data';
import GuidesTableData from './guides-table-data';
import * as actions from '../../../../redux/actions';
import * as ActionTypes from '../../../../redux/ActionTypes';
import isValid from '../../../../utility/isValid';

const ViewAdminProject = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const editProject = () => {
    dispatch({
      type: ActionTypes.SET_PROJECT_ACTION,
      data: 2   // edit project
    });
    
    let project_create_method = isValid(project.projectData.slug) ? 0 : 1;    // 0: from coinranking url, 1: manual input
    dispatch({
      type: ActionTypes.SET_PROJECT_CREATE_METHOD,
      data: project_create_method
    });
    history.push(`${window.location.pathname}/add`);
  }

  const deleteProject = () => {
    actions.deleteProject(project.project_id).then( res => {
      const { success, project } = res.data;
      if(success) {
        dispatch({
          type: ActionTypes.SET_PROJECT,
          data: null,
        });
        dispatch({
            type: ActionTypes.DELETE_PROJECT,
            data: project
        });
        notification['success'] ({
          message: 'The project was deleted successfully',
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
    });
    history.goBack();
  }


  return (
    <>
      <ProjectHeader>
        <PageHeader
          title={project.projectData.name}
          buttons={[
            <CustomButton onClick={editProject} key="1" transparented type="primary" size="default">
              <FeatherIcon icon="edit-3" size={16} /> Edit
            </CustomButton>,
            <CustomButton onClick={deleteProject} key="2"  transparented type="error" size="default">
              <FeatherIcon icon="trash-2" size={16} /> Delete
            </CustomButton>,
          ]}
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
                      <AboutProject />
                    </Col>   
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Row gutter={25}>
                        <Col sm={24} xs={24}>
                          <MainImageTableData />
                        </Col>
                        <Col sm={24} xs={24}>
                          <MainImageTableData mediaCategory={2} />
                        </Col>
                        <Col sm={24} xs={24}>
                          <NewsfeedSourcesTableData />
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={24} md={24} sm={24} xs={24}>
                      <ProjectTeamTableData />
                    </Col>
                    <Col lg={24} md={24} sm={24} xs={24}>
                      <MediaTableData />
                    </Col>
                    <Col lg={24} md={24} sm={24} xs={24}>
                      <GuidesTableData />
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

export default ViewAdminProject;
