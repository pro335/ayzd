import React, { Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Spin, notification } from 'antd';
import { Switch, useHistory } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { ProjectHeader } from './style';
import { Main } from '../../../../../styled';
import { PageHeader } from '../../../../../../components/page-headers/page-headers';
import { Button } from '../../../../../../components/buttons/buttons';
import FullDescription from '../../../FullDescription'
import MainImage from '../../../MainImage'
import Title from './Title';
import * as actions from '../../../../../../redux/actions';
import * as ActionTypes from '../../../../../../redux/ActionTypes';
import isValid from '../../../../../../utility/isValid';
import fileUploadToS3 from '../../../../../../utility/fileUploadToS3';

const AddGuide = () => {

  const history = useHistory();
  
  const dispatch = useDispatch();
  
  const { project, guide } = useSelector(state => {
    return {
      project: state.project,
      guide: state.guide,
    };
  });

  const saveGuide = async () => {
    
    let newGuide = guide.guideData;

    if( !isValid(newGuide) ) {
      notification['error'] ({
        message: 'Error',
        description: 'Please check the data!'
      });
      return;
    }

    if( !isValid(newGuide.full_description) ) {
      notification['error'] ({
        message: 'Error',
        description: 'Please check the full description!'
      });
      return;
    }

    if( !isValid(newGuide.title) ) {
      notification['error'] ({
        message: 'Error',
        description: 'Please check the title!'
      });
      return;
    }

    if( !isValid(newGuide.media) ) {
      notification['error'] ({
        message: 'Error',
        description: 'Please check the preview image!'
      });
      return;
    }

    //Code for preview image(whether uploading image or not)
    let previewImage = null;
    if( newGuide.media instanceof File ) {  // if file

      let resultUpload =  await fileUploadToS3(newGuide.media);
      let {success, data, errMessage} =  resultUpload;
      if(!success) {
        notification['error'] ({
          message: 'Error',
          description: errMessage
        });
  
        previewImage = null;

      } else {
        previewImage = {
          name: data.key,
          url: data.location,
          type: 0,
          relation: 1,
        }
      }
    } else {
      previewImage = newGuide.media;
    }

    //Set the main image of the project
    newGuide = {
      ...guide.guideData,
      media: previewImage
    };


    let data = {
      _id: project.project_id,
      newGuide: newGuide,
    }

    if(guide.guide_action === "create") {

      actions.createProjectGuide(data).then( res => {
        const { success, updated_project } = res.data;
        if(success) {
          dispatch({
            type: ActionTypes.SET_PROJECT,
            data: updated_project
          });
          dispatch({
            type: ActionTypes.UPDATE_PROJECT,
            data: updated_project
          });
          dispatch({
            type: ActionTypes.SET_GUIDE,
            data: null
          });
          notification['success'] ({
            message: 'The guide of the project was created successfully!',
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
    } else {

      data = {
        ...data,
        beforeGuideId: guide.guide_id
      }
      actions.updateProjectGuide(data).then( res => {
        const { success, updated_project } = res.data;
        if(success) {
          dispatch({
            type: ActionTypes.SET_PROJECT,
            data: updated_project
          });
          dispatch({
            type: ActionTypes.UPDATE_PROJECT,
            data: updated_project
          });
          dispatch({
            type: ActionTypes.SET_GUIDE,
            data: null
          });
          notification['success'] ({
            message: 'The guide of the project was updated successfully!',
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
    }

    history.goBack();
  }

  const titleText = guide.guide_action === "create" ? "Add Guide" : "Update Guide";

  return (
    <>
      <ProjectHeader>
        <PageHeader
          title={titleText}
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
                      <FullDescription guideCategory={"guide"} />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Row gutter={25}>
                        <Col sm={24} xs={24}>
                          <Title />
                        </Col>
                        <Col sm={24} xs={24}>
                          <MainImage title={ "Preview image" } guideCategory={"guide"} />
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={24}>
                      <Button onClick={saveGuide} key="1" type="primary" size="default">
                        <FeatherIcon icon="plus" size={16} /> {guide.guide_action === "create" ? "Add Guide" : "Update Guide"}
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

export default AddGuide;
