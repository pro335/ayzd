import React, { Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Spin, Checkbox, notification } from 'antd';
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
import MainImageTableData from '../../main-image-table-data';
import config from '../../../../../../config/config';

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

    if( isValid(newGuide.is_video_guide) && newGuide.is_video_guide && !isValid(newGuide.media_video) ) {
      notification['error'] ({
        message: 'Error',
        description: 'Please upload the video guide! If you don\'t want to upload video, please check the status of \"Upload Video\"!'
      });
      return;
    }

    if( !isValid(newGuide.media_image) ) {
      notification['error'] ({
        message: 'Error',
        description: 'Please check the preview image!'
      });
      return;
    }

    //Code for video guide(whether uploading video or not)
    let media_video = null;
    if( ( isValid(newGuide.is_video_guide) && newGuide.is_video_guide ) &&  (newGuide.media_video instanceof File) ) {  // if file

      let resultUpload =  await fileUploadToS3(newGuide.media_video);
      let {success, data, errMessage} =  resultUpload;
      if(!success) {
        notification['error'] ({
          message: 'Error',
          description: errMessage
        });
  
        media_video = null;

      } else {
        media_video = {
          name: data.key,
          url: `${config.bucket_url}/${data.key}`,
          type: 1,
        }
      }
    } else {
      media_video = newGuide.media_video;
    }

    //Code for preview image(whether uploading image or not)
    let media_image = null;
    if( newGuide.media_image instanceof File ) {  // if file

      let resultUpload =  await fileUploadToS3(newGuide.media_image);
      let {success, data, errMessage} =  resultUpload;
      if(!success) {
        notification['error'] ({
          message: 'Error',
          description: errMessage
        });
  
        media_image = null;

      } else {
        media_image = {
          name: data.key,
          url: data.location,
          type: 0,
        }
      }
    } else {
      media_image = newGuide.media_image;
    }

    //Set the video/preview image of the project
    newGuide = {
      ...guide.guideData,
      media_video: media_video,
      media_image: media_image,
      project: project.project_id,
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

    // history.goBack();
    history.push("/admin/admin-project/view");
  }

  const onIsVideoGuideChange = (e) => {
    let newVal = {
      ...guide.guideData,
      is_video_guide: e.target.checked
    };
    dispatch({
      type: ActionTypes.SET_GUIDE,
      data: newVal
    });
  }

  const titleText = guide.guide_action === "create" ? "Add Guide" : "Update Guide";

  return (
    <>
      <ProjectHeader>
        <PageHeader
          buttons={[
            <Checkbox 
              checked={isValid(guide) && isValid(guide.guideData) && isValid(guide.guideData.is_video_guide) && guide.guideData.is_video_guide ? guide.guideData.is_video_guide : false} 
              onChange={onIsVideoGuideChange}>
                Upload Video
            </Checkbox>,
          ]}
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
                          {
                            isValid(guide) && isValid(guide.guideData) && isValid(guide.guideData.is_video_guide) && guide.guideData.is_video_guide ? (
                              guide.guide_action !== "create" && isValid(guide.guideData.media_video) && isValid(guide.guideData.media_video.url) ?
                                <MainImageTableData mediaCategory={3} />
                                :
                                <MainImage title={ "Video Guide" } guideCategory={"guide_video"} />
                            )
                            :
                            null
                          }
                        </Col>
                        <Col sm={24} xs={24}>
                          {guide.guide_action !== "create" && isValid(guide.guideData) && isValid(guide.guideData.media_image) && isValid(guide.guideData.media_image.url) ?
                            <MainImageTableData mediaCategory={4} />
                            :
                            <MainImage title={ "Preview image" } guideCategory={"guide_image"} />
                          }
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
