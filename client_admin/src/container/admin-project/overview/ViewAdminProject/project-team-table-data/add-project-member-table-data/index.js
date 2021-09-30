import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Col, Row, Upload, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { Button } from '../../../../../../components/buttons/buttons';
import { Modal } from '../../../../../../components/modals/antd-modals';
import { BasicFormWrapper } from '../../../../../styled';
import { ProfileAuthorBox, SocialProfileForm } from './style';
import isValid from '../../../../../../utility/isValid';
import * as actions from '../../../../../../redux/actions';
import * as ActionTypes from '../../../../../../redux/ActionTypes';
import fileUploadToS3 from '../../../../../../utility/fileUploadToS3';

const AddProjectMemberTableData = ({ visible, onCancel }) => {

  const dispatch = useDispatch();
  
  const { project, member } = useSelector(state => {
    return {
      project: state.project,
      member: state.member,
    };
  });
  
  const [form] = Form.useForm();

  const [state, setState] = useState({
    modalType: 'primary',
    checked: [],
    visible: false,
    status: null,    // 0: Super-admin, 1: Editor
    defaultFileList: [],
    initialData: {
      name: member.member_action === "update" && isValid(member.memberData.name) ? member.memberData.name : "",
      position: member.member_action === "update" && isValid(member.memberData.position) ? member.memberData.position : "",
      facebook_link: member.member_action === "update" && isValid(member.memberData.facebook_link) ? member.memberData.facebook_link : "",
      twitter_link: member.member_action === "update" && isValid(member.memberData.twitter_link) ? member.memberData.twitter_link : "",
      dribbble_link: member.member_action === "update" && isValid(member.memberData.dribbble_link) ? member.memberData.dribbble_link : "",
      instagram_link: member.member_action === "update" && isValid(member.memberData.instagram_link) ? member.memberData.instagram_link : "",
      medium_link: member.member_action === "update" && isValid(member.memberData.medium_link) ? member.memberData.medium_link : "",
    },
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

    if(member.member_action === "create") {    // if create new member
      temp_defaultFileList = null;
    } else if(member.member_action === "update") {    // if update main image
      // Pick the media.
      let tempMemberList = project.projectData.member_list.filter(function(item) {
        return item._id === member.member_id;
      });

      if(isValid(tempMemberList)) {
        temp_defaultFileList =  [
          {
            uid: '1',
            name: isValid(tempMemberList[0].avatar) ? tempMemberList[0].avatar.name : "",
            status: 'done',
            response: 'Server Error 500', // custom error message to show
            url: isValid(tempMemberList[0].avatar) ? tempMemberList[0].avatar.url : "",
          }
        ];
      }
    }
    setState({
      ...state,
      defaultFileList: temp_defaultFileList,
      visible: true,
    });
  }, [])

  const save = async () => {
    let newMember = member.memberData;

    if( !isValid(newMember) ) {
      notification['error'] ({
        message: 'Error',
        description: 'Please check the data!'
      });
      return false;
    }

    if( !isValid(newMember.avatar) ) {
      notification['error'] ({
        message: 'Error',
        description: 'Please check the profile photo!'
      });
      return false;
    }

    if( !isValid(newMember.name) ) {
      notification['error'] ({
        message: 'Error',
        description: 'Please check the name!'
      });
      return false;
    }

    if( !isValid(newMember.position) ) {
      notification['error'] ({
        message: 'Error',
        description: 'Please check the position!'
      });
      return false;
    }

    // if( !isValid(newMember.facebook_link) ) {
    //   notification['error'] ({
    //     message: 'Error',
    //     description: 'Please check the facebook url!'
    //   });
    //   return false;
    // }

    // if( !isValid(newMember.twitter_link) ) {
    //   notification['error'] ({
    //     message: 'Error',
    //     description: 'Please check the twitter username!'
    //   });
    //   return false;
    // }

    // if( !isValid(newMember.dribbble_link) ) {
    //   notification['error'] ({
    //     message: 'Error',
    //     description: 'Please check the dribbble url!'
    //   });
    //   return false;
    // }

    // if( !isValid(newMember.instagram_link) ) {
    //   notification['error'] ({
    //     message: 'Error',
    //     description: 'Please check the instagram url!'
    //   });
    //   return false;
    // }

    // if( !isValid(newMember.medium_link) ) {
    //   notification['error'] ({
    //     message: 'Error',
    //     description: 'Please check the medium url!'
    //   });
    //   return false;
    // }

    //Code for preview image(whether uploading image or not)
    let avatar = null;
    if( newMember.avatar instanceof File ) {  // if file

      let resultUpload =  await fileUploadToS3(newMember.avatar);
      let {success, data, errMessage} =  resultUpload;
      if(!success) {
        notification['error'] ({
          message: 'Error',
          description: errMessage
        });
  
        avatar = null;

      } else {
        avatar = {
          name: data.key,
          url: data.location,
          type: 0,
          relation: 1,
        }
      }
    } else {
      avatar = newMember.avatar;
    }

    //Set the avatar of the member
    newMember = {
      ...member.memberData,
      avatar: avatar
    };

    let data = {
      _id: project.project_id,
      newMember: newMember,
    }

    if(member.member_action === "create") {     // create new member

      actions.createProjectMember(data).then( res => {
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
            type: ActionTypes.SET_MEMBER,
            data: null
          });
          notification['success'] ({
            message: 'The new project member was created successfully!',
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
    } else {    // update existing member

      data = {
        ...data,
        beforeMemberId: member.member_id
      }
      actions.updateProjectMember(data).then( res => {
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
            type: ActionTypes.SET_MEMBER,
            data: null
          });
          notification['success'] ({
            message: 'The member of the project was updated successfully!',
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

    return true;
  }

  const handleOk = async () => {
    let result = await save();
    if(!result) {
      return;
    }
    onCancel();
  };

  const handleCancel = () => {
    dispatch({
      type: ActionTypes.SET_MEMBER,
      data: null
    });
    onCancel();
  };

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
          description: 'Image must smaller than 8MB!'
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

          if(imageUrl !== null && imageUrl !== undefined) {
            newVal = {
              ...member.memberData,
              avatar: info.file.originFileObj,
            };
          } else {
            newVal = {
              ...member.memberData,
              avatar: null,
            };
          }
          dispatch({
            type: ActionTypes.SET_MEMBER,
            data: newVal
          });
        });
    
      } 
    },
    onRemove(file) {
      let newVal = {
        ...member.memberData,
        avatar: null,
      };
      dispatch({
        type: ActionTypes.SET_MEMBER,
        data: newVal
      });
    }
  };

  const handleFormData = (props, values, allFieldsValues) => {
    let newVal = {
      ...member.memberData,
      ...props
    };
    dispatch({
      type: ActionTypes.SET_MEMBER,
      data: newVal
    });
  }

  const title = (member.member_action === "create" ? "Add" : "Update") + " " + "Project Team Member";
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
            {"Save & Next"}
          </Button>
        </div>,
      ]}
      onCancel={handleCancel}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form form={form} name="addProjectMemberTableData" onValuesChange={handleFormData} initialValues={state.initialData}>
            <Form.Item name="avatar" label="">
              <ProfileAuthorBox>
                <Row className="author-info" align="middle">
                  <Col>
                    <figure>
                      <img src={require('../../../../../../assets/img/general_avatar.png')} alt="" />
                      <Upload {...props}>
                        <Link to="#">
                          <FeatherIcon icon="camera" />
                        </Link>
                      </Upload>
                    </figure>
                  </Col>
                  <Col>
                    <span className="avatar-caption">Profile Photo</span>
                  </Col>
                </Row>
              </ProfileAuthorBox>
            </Form.Item>
            <Form.Item name="name" label="Name">
              <Input placeholder="Duran Clayton" />
            </Form.Item>
            <Form.Item name="position" label="Position">
              <Input placeholder="Co-founder/ceo" />
            </Form.Item>
            <SocialProfileForm>
              <Form.Item name="facebook_link" label="Facebook">
                <Input
                  className="facebook"
                  prefix={
                    <FontAwesome
                      className="super-crazy-colors"
                      size="2x"
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                      name="facebook"
                    />
                  }
                  placeholder="URL"
                />
              </Form.Item>
              <Form.Item name="twitter_link" label="Twitter">
                <Input
                  className="twitter"
                  prefix={
                    <FontAwesome
                      className="super-crazy-colors"
                      size="2x"
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                      name="twitter"
                    />
                  }
                  placeholder="@username"
                />
              </Form.Item>
              <Form.Item name="dribbble_link" label="Linkedin">
                <Input
                  className="linkedin"
                  prefix={
                    <FontAwesome
                      className="super-crazy-colors"
                      size="2x"
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                      name="linkedin"
                    />
                  }
                  placeholder="URL"
                />
              </Form.Item>
              <Form.Item name="instagram_link" label="Instagram">
                <Input
                  className="instagram"
                  prefix={
                    <FontAwesome
                      className="super-crazy-colors"
                      size="2x"
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                      name="instagram"
                    />
                  }
                  placeholder="URL"
                />
              </Form.Item>
              <Form.Item name="medium_link" label="Medium">
                <Input
                  className="medium"
                  prefix={
                    <FontAwesome
                      className="super-crazy-colors"
                      size="2x"
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                      name="medium"
                    />
                  }
                  placeholder="Url"
                />
              </Form.Item>
            </SocialProfileForm>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

AddProjectMemberTableData.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default AddProjectMemberTableData;
