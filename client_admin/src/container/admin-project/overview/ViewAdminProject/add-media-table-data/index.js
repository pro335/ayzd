import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Select, Upload, notification } from 'antd';
import propTypes from 'prop-types';
import { Button } from '../../../../../components/buttons/buttons';
import { Modal } from '../../../../../components/modals/antd-modals';
import { BasicFormWrapper } from '../../../../styled';
import isValid from '../../../../../utility/isValid';
import * as ActionTypes from '../../../../../redux/ActionTypes';
import * as actions from '../../../../../redux/actions';
import fileUploadToS3 from '../../../../../utility/fileUploadToS3';
import config from '../../../../../config/config';

const { Option } = Select;

const AddMediaTableData = ({ visible, onCancel, mediaCategory = 1, mediaId = 0, mediaAction = 1 }) => {
  const dispatch = useDispatch();

  /**
   * Description about the each parameters
   * 
   * mediaCategory:     0: main image, 1: media, 2: secondary image, 3: video guide, 4: image guide, default: 1,
   * mediaId: the object id of media, default: 0,
   * mediaAction: 0: add, 1: update, default: 1
   * 
   */

  const [form] = Form.useForm();

  
  const { project, guide } = useSelector(state => {
    return {
      project: state.project,
      guide: state.guide,
    };
  });

  const [state, setState] = useState({
    modalType: 'primary',
    checked: [],
    media: null,
    isFile: false,
    defaultFileList: null,
    mediaType: 0, // 0: image, 1: video, 2: other, default: 0,
  });

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setState({
        visible,
      });
    }
    return () => {
      unmounted = true;
    };
  }, [visible]);

  useEffect(() => {
    let temp_defaultFileList = null;
    let tempMediaType = 0;
    let tempMedia = null;

    if(mediaCategory === 1 && mediaAction === 0) {    // if create new media
      temp_defaultFileList = null;
    } else if(mediaCategory === 0 && mediaAction === 1) {    // if update main image
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
    } else if(mediaCategory === 1 && mediaAction === 1) {    // if update media
      // Pick the media.
      let tempMediaList = project.projectData.media_list.filter(function(item) {
        return item._id === mediaId;
      });

      tempMediaType = tempMediaList[0].type;

      if(isValid(tempMediaList)) {
        temp_defaultFileList =  [
          {
            uid: '1',
            name: isValid(tempMediaList[0]) ? tempMediaList[0].name : "",
            status: 'done',
            response: 'Server Error 500', // custom error message to show
            url: isValid(tempMediaList[0]) ? tempMediaList[0].url : "",
          }
        ];

        tempMedia = isValid(tempMediaList[0]) ? tempMediaList[0] : null;
      }
    } else if(mediaCategory === 2 && mediaAction === 1) {    // if update secondary image
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
    } else if(mediaCategory === 3 && mediaAction === 1) {    // if update video guide
      temp_defaultFileList = [
        {
          uid: '1',
          name: isValid(guide.guideData.media_video) ? guide.guideData.media_video.name : "",
          status: 'done',
          response: 'Server Error 500', // custom error message to show
          url: isValid(guide.guideData.media_video) ? guide.guideData.media_video.url : "",
        }
      ];
      tempMedia = isValid(guide.guideData.media_video) ? guide.guideData.media_video : null;
    } else if(mediaCategory === 4 && mediaAction === 1) {    // if update image guide
      temp_defaultFileList = [
        {
          uid: '1',
          name: isValid(guide.guideData.media_image) ? guide.guideData.media_image.name : "",
          status: 'done',
          response: 'Server Error 500', // custom error message to show
          url: isValid(guide.guideData.media_image) ? guide.guideData.media_image.url : "",
        }
      ];
      tempMedia = isValid(guide.guideData.media_image) ? guide.guideData.media_image : null;
    }

    setState({
      defaultFileList: temp_defaultFileList,
      media: tempMedia,
      isFile: false,
      mediaType: tempMediaType,
      visible: true,
    });
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
      const isLt128M = file.size / 1024 / 1024 < 128;
      if (!isLt128M) {
        notification['error'] ({
          message: 'Error',
          description: 'Media file must be smaller than 128MB!'
        });
      }
      return isLt128M;
    },
    onChange(info) {
      // if (info.file.status === 'uploading') {
      // }
      if (info.file.status === 'done' || info.file.status === 'error') {
        getBase64(info.file.originFileObj, imageUrl => {

          if( isValid(imageUrl) ) {
            setState({
              visible: true,
              media: info.file.originFileObj,
              isFile: true,
            })
          } else {
            setState({
              visible: true,
              media: null,
              isFile: true,
            })
          }
        });
    
      }
    },
    onRemove(file) {
      setState({
        ...state,
        media: null,
        isFile: true,
      })
    }
  };

  const processFunc = async () => {

    if(mediaCategory === 0 && mediaAction === 1) {    // if update main image
      let main_image = null;

      if(!state.isFile)
        return;

      if( isValid(state.media) ) {

        let resultUpload =  await fileUploadToS3(state.media);
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
      } else {
        main_image = null;
      }

      let newProject = {
        _id: project.project_id,
        main_image: main_image
      }

      actions.updateMainImage(newProject).then( res => {
        const { success, media, isExistingProject, updated_project } = res.data;
        if(success) {
          if(isExistingProject) {
            dispatch({
              type: ActionTypes.SET_PROJECT,
              data: updated_project
            });
            dispatch({
                type: ActionTypes.UPDATE_PROJECT,
                data: updated_project
            });
          }
          // if(isValid(media)) {
          //   dispatch({
          //     type: ActionTypes.UPDATE_MEDIA,
          //     data: media
          //   });
          // }  
          notification['success'] ({
            message: 'The main image of the project was updated successfully',
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
    } else if(mediaCategory === 1 && mediaAction === 0) {    // if create new media
      let newMedia = null;
      if( isValid(state.media) ) {

        let resultUpload =  await fileUploadToS3(state.media);
        let {success, data, errMessage} =  resultUpload;
        if(!success) {
          notification['error'] ({
            message: 'Error',
            description: errMessage
          });
    
          newMedia = null;

        } else {
          newMedia = {
            name: data.key,
            url: data.location,
            type: form.getFieldValue("type"),
            relation: 6,
          }
        }
      } else {
        newMedia = null;
      }

      let newProject = {
        _id: project.project_id,
        newMedia: newMedia
      }

      actions.createProjectMedia(newProject).then( res => {
        const { success, media, isExistingProject, updated_project } = res.data;
        if(success) {
          if(isExistingProject) {
            dispatch({
              type: ActionTypes.SET_PROJECT,
              data: updated_project
            });
            dispatch({
                type: ActionTypes.UPDATE_PROJECT,
                data: updated_project
            });
          }
          notification['success'] ({
            message: 'New media was added successfully',
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
    } else if(mediaCategory === 1 && mediaAction === 1) {    // if update media
      let newMedia = null;

      if(!state.isFile)
        return;

      if( isValid(state.media) ) {

        let resultUpload =  await fileUploadToS3(state.media);
        let {success, data, errMessage} =  resultUpload;
        if(!success) {
          notification['error'] ({
            message: 'Error',
            description: errMessage
          });
    
          newMedia = null;

        } else {
          newMedia = {
            name: data.key,
            url: data.location,
            type: form.getFieldValue("type"),
            relation: 6,
          }
        }
      } else {
        newMedia = null;
      }

      let newProject = {
        _id: project.project_id,
        beforeMediaId: mediaId,
        newMedia: newMedia
      }

      actions.updateProjectMedia(newProject).then( res => {
        const { success, media, isExistingProject, updated_project } = res.data;
        if(success) {
          if(isExistingProject) {
            dispatch({
              type: ActionTypes.SET_PROJECT,
              data: updated_project
            });
            dispatch({
                type: ActionTypes.UPDATE_PROJECT,
                data: updated_project
            });
          }
          notification['success'] ({
            message: 'The media of the project was updated successfully!',
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
    } else if(mediaCategory === 2 && mediaAction === 1) {    // if update secondary image
      let secondary_image = null;

      if(!state.isFile)
        return;

      if( isValid(state.media) ) {

        let resultUpload =  await fileUploadToS3(state.media);
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
            relation: 5,
          }
        }
      } else {
        secondary_image = null;
      }

      let newProject = {
        _id: project.project_id,
        secondary_image: secondary_image
      }

      actions.updateSecondaryImage(newProject).then( res => {
        const { success, media, isExistingProject, updated_project } = res.data;
        if(success) {
          if(isExistingProject) {
            dispatch({
              type: ActionTypes.SET_PROJECT,
              data: updated_project
            });
            dispatch({
                type: ActionTypes.UPDATE_PROJECT,
                data: updated_project
            });
          }
          // if(isValid(media)) {
          //   dispatch({
          //     type: ActionTypes.UPDATE_MEDIA,
          //     data: media
          //   });
          // }  
          notification['success'] ({
            message: 'The image of the project was updated successfully',
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
    } else if(mediaCategory === 3 && mediaAction === 1) {    // if update video guide
      let media_video = null;

      if(!state.isFile)
        return;

      if( isValid(state.media) ) {

        let resultUpload =  await fileUploadToS3(state.media);
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
            relation: 5,
          }
        }
      } else {
        media_video = null;
      }

      let newProject = {
        _id: project.project_id,
        beforeGuideId: guide.guideData._id,
        newGuide: {
          ...guide.guideData,
          media_video: media_video
        }
      }

      actions.updateProjectGuide(newProject).then( res => {
        const { success, isExistingProject, updated_project, guide_data } = res.data;
        if(success) {
          if(isExistingProject) {
            dispatch({
              type: ActionTypes.SET_PROJECT,
              data: updated_project
            });
            dispatch({
                type: ActionTypes.UPDATE_PROJECT,
                data: updated_project
            });
            if(isValid(guide_data)) {
              dispatch({
                type: ActionTypes.SET_GUIDE,
                data: guide_data
              });
            }
          }
          // if(isValid(media)) {
          //   dispatch({
          //     type: ActionTypes.UPDATE_MEDIA,
          //     data: media
          //   });
          // }  
          notification['success'] ({
            message: 'The video of the guide was updated successfully',
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
    } else if(mediaCategory === 4 && mediaAction === 1) {    // if update image guide
      let media_image = null;

      if(!state.isFile)
        return;

      if( isValid(state.media) ) {

        let resultUpload =  await fileUploadToS3(state.media);
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
            relation: 5,
          }
        }
      } else {
        media_image = null;
      }

      let newProject = {
        _id: project.project_id,
        beforeGuideId: guide.guideData._id,
        newGuide: {
          ...guide.guideData,
          media_image: media_image
        }
      }

      actions.updateProjectGuide(newProject).then( res => {
        const { success, isExistingProject, updated_project, guide_data } = res.data;
        if(success) {
          if(isExistingProject) {
            dispatch({
              type: ActionTypes.SET_PROJECT,
              data: updated_project
            });
            dispatch({
                type: ActionTypes.UPDATE_PROJECT,
                data: updated_project
            });
          }
          if(isValid(guide_data)) {
            dispatch({
              type: ActionTypes.SET_GUIDE,
              data: guide_data
          });
        }
          // if(isValid(media)) {
          //   dispatch({
          //     type: ActionTypes.UPDATE_MEDIA,
          //     data: media
          //   });
          // }  
          notification['success'] ({
            message: 'The image of the guide was updated successfully',
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
    onCancel();
  };

  const handleOk = async () => {
    await processFunc();
    onCancel();
  }

  const handleCancel = () => {
    onCancel();
  };

  const title = (mediaAction === 0 ? "Add" : "Update") + " " + (mediaCategory === 0 ? "Main Image" : "Media");
  return (
    <Modal
      type={state.modalType}
      title={title}
      visible={state.visible}
      footer={[
        <div key="1">
          <Button size="default" type="white" key="back" outlined onClick={handleCancel}>
            Cancel
          </Button>
          <Button size="default" type="primary" key="submit" onClick={handleOk}>
            Save & Next
          </Button>
        </div>,
      ]}
      onCancel={handleCancel}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form form={form} name="addMediaTableData">
            <Form.Item name="name" label="">
              <Form name="sDash_upload" className="sDash_upload-form mb-25" layout="vertical">
                <Upload className="sDash_upload-basic" {...props}>
                  <span className="sDash_upload-text">Select File</span>
                  <Link to="#" className="sDash_upload-browse">
                    Browse
                  </Link>
                </Upload>
              </Form>
            </Form.Item>

            { mediaCategory === 1 || mediaCategory === 2 ?
              <Form.Item name="type" initialValue={state.mediaType} label="Type">
                <Select style={{ width: '100%' }}>
                  <Option value={0}>Image</Option>
                  <Option value={1}>Video</Option>
                  <Option value={2}>Other</Option>
                </Select>
              </Form.Item>
            :
              null 
            }
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

AddMediaTableData.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default AddMediaTableData;
