import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Upload, notification } from 'antd';
import { Link } from 'react-router-dom';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import * as ActionTypes from '../../../../redux/ActionTypes';
import isValid from '../../../../utility/isValid';

const MainImage = ({guideCategory = "project", title = null}) => {

  /**
   * Description of the params
   * 
   * guideCategory: determine main/secondary image of the project or the video/preview image of the add guide
   *                  project: main image of the project, secondary: secondary image of the project, guide_video: video of the add guide, guide_image: preview image of add guide
  */
  
  const [state, setState] = useState({
    media: null,
    isFile: false,
    defaultFileList: null,
  });

  const dispatch = useDispatch();
  
  const { project, guide } = useSelector(state => {
    return {
      project: state.project,
      guide: state.guide,
    };
  });

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      let temp_defaultFileList = null;
      let tempMedia = null;

      if(project.project_action === 0)  {     // if create project
        temp_defaultFileList = null;
      } else {    // if update project
        if(guideCategory === "project") {   // main image of project
          temp_defaultFileList = [
            {
              uid: '1',
              name: isValid(project.projectData.main_image) ? project.projectData.main_image.name : "",
              status: 'done',
              response: 'Server Error 500', // custom error message to show
              url: isValid(project.projectData.main_image) ? project.projectData.main_image.url : "",
            }
          ];
          tempMedia = isValid(project.projectData.main_image) ? project.projectData.main_image : null;
        } else if(guideCategory === "secondary") {   // secondary image of project
          temp_defaultFileList = [
            {
              uid: '1',
              name: isValid(project.projectData.secondary_image) ? project.projectData.secondary_image.name : "",
              status: 'done',
              response: 'Server Error 500', // custom error message to show
              url: isValid(project.projectData.secondary_image) ? project.projectData.secondary_image.url : "",
            }
          ];
          tempMedia = isValid(project.projectData.secondary_image) ? project.projectData.secondary_image : null;
        } else if(guideCategory === "guide_video") {    // guide_video
          temp_defaultFileList = [
            {
              uid: '1',
              name: isValid(guide) && isValid(guide.guideData) && isValid(guide.guideData.media_video) ? guide.guideData.media_video.name : "",
              status: 'done',
              response: 'Server Error 500', // custom error message to show
              url: isValid(guide) && isValid(guide.guideData) && isValid(guide.guideData.media_video) ? guide.guideData.media_video.url : "",
            }
          ];
          tempMedia = isValid(guide) && isValid(guide.guideData) && isValid(guide.guideData.media_video) ? guide.guideData.media_video : null;
        } else if(guideCategory === "guide_image") {    // guide_image
          temp_defaultFileList = [
            {
              uid: '1',
              name: isValid(guide) && isValid(guide.guideData) && isValid(guide.guideData.media_image) ? guide.guideData.media_image.name : "",
              status: 'done',
              response: 'Server Error 500', // custom error message to show
              url: isValid(guide) && isValid(guide.guideData) && isValid(guide.guideData.media_image) ? guide.guideData.media_image.url : "",
            }
          ];
          tempMedia = isValid(guide) && isValid(guide.guideData) && isValid(guide.guideData.media_image) ? guide.guideData.media_image : null;
        }
      }

      setState({
        ...state,
        defaultFileList: temp_defaultFileList,
        media: tempMedia,
        isFile: false,
      });
    }
    return () => {
      unmounted = true;
    };

  }, [])

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    multiple: false,
    showUploadList: true,
    maxCount: 1,
    defaultFileList: state.defaultFileList,
    headers: {
      authorization: 'authorization-text',
    },
    beforeUpload(file) {
      const isLt8M = file.size / 1024 / 1024 < 8;
      if (!isLt8M) {
        notification['error'] ({
          message: 'Error',
          description: 'Image must be smaller than 8MB!'
        });
      }
      return isLt8M;
    },
    onChange(info) {
      // if (info.file.status === 'uploading') {
      // }
      if (info.file.status === 'done' || info.file.status === 'error') {
        getBase64(info.file.originFileObj, imageUrl => {

          let newVal = null;

          if(guideCategory === "project") {
            if(isValid(imageUrl)) {
              newVal = {
                ...project.projectData,
                main_image: info.file.originFileObj,
              };
            } else {
              newVal = {
                ...project.projectData,
                main_image: null,
              };
            }
            dispatch({
              type: ActionTypes.SET_PROJECT,
              data: newVal
            });
          } else if(guideCategory === "secondary") {
            if(isValid(imageUrl)) {
              newVal = {
                ...project.projectData,
                secondary_image: info.file.originFileObj,
              };
            } else {
              newVal = {
                ...project.projectData,
                secondary_image: null,
              };
            }
            dispatch({
              type: ActionTypes.SET_PROJECT,
              data: newVal
            });
          } else if(guideCategory === "guide_video") {
            if(isValid(imageUrl)) {
              newVal = {
                ...guide.guideData,
                media_video: info.file.originFileObj,
              };
            } else {
              newVal = {
                ...guide.guideData,
                media_video: null,
              };
            }
            dispatch({
              type: ActionTypes.SET_GUIDE,
              data: newVal
            });
          } else if(guideCategory === "guide_image") {
            if(isValid(imageUrl)) {
              newVal = {
                ...guide.guideData,
                media_image: info.file.originFileObj,
              };
            } else {
              newVal = {
                ...guide.guideData,
                media_image: null,
              };
            }
            dispatch({
              type: ActionTypes.SET_GUIDE,
              data: newVal
            });
          }
        });
    
      }
    },
    onRemove(file) {
      let newVal = null;
      if(guideCategory === "project") {
        newVal = {
          ...project.projectData,
          main_image: null,
        };
        dispatch({
          type: ActionTypes.SET_PROJECT,
          data: newVal
        });
      } else if(guideCategory === "secondary") {
        newVal = {
          ...project.projectData,
          secondary_image: null,
        };
        dispatch({
          type: ActionTypes.SET_PROJECT,
          data: newVal
        });
      } else if(guideCategory === "guide_video") {
        newVal = {
          ...guide.guideData,
          media_video: null,
        };
        dispatch({
          type: ActionTypes.SET_GUIDE,
          data: newVal
        });
      } else if(guideCategory === "guide_image") {
        newVal = {
          ...guide.guideData,
          media_image: null,
        };
        dispatch({
          type: ActionTypes.SET_GUIDE,
          data: newVal
        });
      }
    }
  };
  
  const titleText = isValid(title) ? title : "File Browser";
  return (
    <Cards title={titleText} className="sDash_upload-form mb-25">
      <Form name="sDash_upload" layout="vertical">
        <Upload className="sDash_upload-basic" {...props}>
          <span className="sDash_upload-text">Select File</span>
          <Link to="#" className="sDash_upload-browse">
            Browse
          </Link>
        </Upload>
      </Form>
    </Cards>
  );
};

export default MainImage;
