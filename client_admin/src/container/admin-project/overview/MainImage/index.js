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
   * guideCategory: determine main/secondary image of the project or the preview image of the add guide
   *                  project: main image of the project, secondary: secondary image of the project, guide: preview image of the add guide
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
        } else if(guideCategory === "guide") {    // guide
          temp_defaultFileList = [
            {
              uid: '1',
              name: isValid(guide) && isValid(guide.guideData) && isValid(guide.guideData.media) ? guide.guideData.media.name : "",
              status: 'done',
              response: 'Server Error 500', // custom error message to show
              url: isValid(guide) && isValid(guide.guideData) && isValid(guide.guideData.media) ? guide.guideData.media.url : "",
            }
          ];
          tempMedia = isValid(guide) && isValid(guide.guideData) && isValid(guide.guideData.media) ? guide.guideData.media : null;
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
            if(imageUrl !== null && imageUrl !== undefined) {
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
            if(imageUrl !== null && imageUrl !== undefined) {
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
          } else if(guideCategory === "guide") {
            if(imageUrl !== null && imageUrl !== undefined) {
              newVal = {
                ...guide.guideData,
                media: info.file.originFileObj,
              };
            } else {
              newVal = {
                ...guide.guideData,
                media: null,
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
      } else if(guideCategory === "guide") {
        newVal = {
          ...guide.guideData,
          media: null,
        };
        dispatch({
          type: ActionTypes.SET_GUIDE,
          data: newVal
        });
      }
    }
  };
  
  const titleText = title !== null && title !== undefined ? title : "File Browser";
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
