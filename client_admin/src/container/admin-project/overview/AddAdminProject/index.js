import React, { useState, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, useHistory } from 'react-router-dom';
import { Row, Col, Spin, Checkbox, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { ProjectHeader, FullDescriptionWrapper } from './style';
import { Main } from '../../../styled';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { Button } from '../../../../components/buttons/buttons';
import isValid from '../../../../utility/isValid';
import ProjectInfo from './ProjectInfo'
import ExternalButton from './ExternalButton'
import NewsfeedSources from './NewsfeedSources'
import SimilarProjects from './SimilarProjects'
import Upcoming from './Upcoming'
import Links from './Links'
import Score from './Score'
import FullDescription from '../FullDescription'
import MainImage from '../MainImage'
import MainImageTableData from '../ViewAdminProject/main-image-table-data';
import * as actions from '../../../../redux/actions';
import * as ActionTypes from '../../../../redux/ActionTypes';
import fileUploadToS3 from '../../../../utility/fileUploadToS3';

const AddAdminProject = ({ match }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const saveProject = async () => {
    let newProject = project.projectData;
    if( !isValid(newProject) ) {
      notification['error'] ({
        message: 'Error',
        description: 'Please check the fields of the project!'
      });
      return;
    }
    if( !isValid(newProject.name) ) {
      notification['error'] ({
        message: 'Error',
        description: 'Please check the name!'
      });
      return;
    }
    if( isValid(newProject.isUpcoming) && newProject.isUpcoming && !isValid(newProject.upcoming_date) ) {
      notification['error'] ({
        message: 'Error',
        description: 'Please pick the upcoming date and time!'
      });
      return;
    }
    if( (!isValid(newProject.btn_label) && isValid(newProject.btn_url)) || (isValid(newProject.btn_label) && !isValid(newProject.btn_url)) ) {
      notification['error'] ({
        message: 'Error',
        description: 'You should type both button\'s label and button\'s link(Or just leave both two fields). Please confirm again!'
      });
      return;
    }
    // if( !isValid(newProject.category) ) {
    //   notification['error'] ({
    //     message: 'Error',
    //     description: 'Please check the category!'
    //   });
    //   return;
    // }
    // if( !isValid(newProject.chain) ) {
    //   notification['error'] ({
    //     message: 'Error',
    //     description: 'Please check the chain!'
    //   });
    //   return;
    // }
    // if( !isValid(newProject.small_description) ) {
    //   notification['error'] ({
    //     message: 'Error',
    //     description: 'Please check the small description!'
    //   });
    //   return;
    // }
    // if( !isValid(newProject.full_description) ) {
    //   notification['error'] ({
    //     message: 'Error',
    //     description: 'Please check the full description!'
    //   });
    //   return;
    // }
    if( isValid(newProject.newsfeedSource_list) ) {
      for(let i = 0 ; i < newProject.newsfeedSource_list.length ; i ++) {
        if( !isValid(newProject.newsfeedSource_list[i].link) ) {
          notification['error'] ({
            message: 'Error',
            description: 'Please check the Rss link of the newsfeed source!'
          });
          return;
        }
      }
    }
    if( isValid(newProject.similar_list) ) {
      for(let i = 0 ; i < newProject.similar_list.length ; i ++) {
        if( !isValid(newProject.similar_list[i]) ) {
          notification['error'] ({
            message: 'Error',
            description: 'Please check the Similar projects!'
          });
          return;
        }
      }
    }

    //Code for main image(whether uploading image or not)
    let main_image = null;
    if( newProject.main_image instanceof File ) {   // if file, then upload

      let resultUpload =  await fileUploadToS3(newProject.main_image);
      let {success, data, errMessage} =  resultUpload;
      if(!success) {
        notification['error'] ({
          message: 'Error',
          description: errMessage
        });
  
        main_image = null;

      } else {
        main_image = {
          name: data.key,
          url: data.location,
          type: 0,
          relation: 5,
        }
      }
    } else if( isValid(newProject.main_image) ) {   // existing saved file
      main_image = newProject.main_image;
    } else {    // not existed & not file
      main_image = null;
    }

    //Code for secondary image(whether uploading image or not)
    let secondary_image = null;
    if( newProject.secondary_image instanceof File ) {   // if file, then upload

      let resultUpload =  await fileUploadToS3(newProject.secondary_image);
      let {success, data, errMessage} =  resultUpload;
      if(!success) {
        notification['error'] ({
          message: 'Error',
          description: errMessage
        });
  
        secondary_image = null;

      } else {
        secondary_image = {
          name: data.key,
          url: data.location,
          type: 0,
          relation: 6,
        }
      }
    } else if( isValid(newProject.secondary_image) ) {   // existing saved file
      secondary_image = newProject.secondary_image;
    } else {    // not existed & not file
      secondary_image = null;
    }

    // update category value (if object, to _id)
    let category = null;
    if(isValid(newProject.category) && isValid(newProject.category._id)) {
      category = newProject.category._id;
    } else {
      category = newProject.category;
    }
  
    // update chain value (if object, to _id)
    let chain = null;
    if(isValid(newProject.chain) && isValid(newProject.chain._id)) {
      chain = newProject.chain._id;
    } else {
      chain = newProject.chain;
    }   

    // update similar list (if object, to _id)
    let similar_list = [];
    if( isValid(newProject.similar_list) ) {
      for(let i = 0 ; i < newProject.similar_list.length ; i ++) {
        if( isValid(newProject.similar_list[i]._id) ) {
          similar_list.push(newProject.similar_list[i]._id);
        } else {
          similar_list.push(newProject.similar_list[i]);
        }
      }
    }

    //Set the main image of the project
    newProject = {
      ...project.projectData,
      category: category,
      chain: chain,
      main_image: main_image,
      secondary_image: secondary_image,
      similar_list: similar_list,
    };

    if(project.project_action === 0) {    // create project
      actions.addProject(newProject).then( res => {
        const { success, project } = res.data;
        if(success) {
          dispatch({
              type: ActionTypes.ADD_PROJECT,
              data: project
          });

          notification['success'] ({
            message: 'New Project was created successfully',
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
    } else {    // update project
      
      actions.updateProject(newProject).then( res => {
        const { success, project } = res.data;
        if(success) {
          dispatch({
              type: ActionTypes.UPDATE_PROJECT,
              data: project
          });

          notification['success'] ({
            message: 'The Project was updated successfully',
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
    }

    // history.goBack();
    history.push("/admin/admin-project");
  }

  const onUpcomingChange = (e) => {
    let newVal = {
      ...project.projectData,
      isUpcoming: e.target.checked
    };
    dispatch({
      type: ActionTypes.SET_PROJECT,
      data: newVal
    });
  }

  const title = (project.project_action === 0 ? "Add" : "Update") + " " + "Project";
  return (
    <>
      <ProjectHeader>
        <PageHeader
          buttons={[
            <Checkbox 
              checked={isValid(project.projectData) && isValid(project.projectData.isUpcoming) ? project.projectData.isUpcoming : false} 
              onChange={onUpcomingChange}>
                Upcoming
            </Checkbox>,
          ]}
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
                        <Col sm={24} xs={24}>
                          <FullDescriptionWrapper>
                            <FullDescription/>
                          </FullDescriptionWrapper>
                        </Col>   
                        <Col sm={24} xs={24}>
                          <ExternalButton />
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Row gutter={25}>
                        <Col sm={24} xs={24}>
                          {project.project_action === 2 && isValid(project.projectData.main_image) && isValid(project.projectData.main_image._id) ?
                            <MainImageTableData />
                            :
                            <MainImage title={"Main image"} />
                          }
                        </Col>
                        <Col sm={24} xs={24}>
                          {project.project_action === 2 && isValid(project.projectData.secondary_image) && isValid(project.projectData.secondary_image._id) ?
                            <MainImageTableData mediaCategory={2} />
                            :
                            <MainImage title={"Secondary image"} guideCategory = {"secondary"} />
                          }
                        </Col>
                        <Col sm={24} xs={24}>
                          <Score />
                        </Col>
                        <Col sm={24} xs={24}>
                          <NewsfeedSources />
                        </Col>
                        <Col sm={24} xs={24}>
                          <Links />
                        </Col>
                        <Col sm={24} xs={24}>
                          <SimilarProjects />
                        </Col>
                        {isValid(project.projectData) && isValid(project.projectData.isUpcoming) && project.projectData.isUpcoming ?
                          <Col sm={24} xs={24}>
                            <Upcoming />
                          </Col>
                          :
                          null
                        }
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
