import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Upload, Radio, Spin, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import * as actions from '../../../redux/actions';
import * as ActionTypes from '../../../redux/ActionTypes';
import { BasicFormWrapper } from '../../styled';
import { RecordFormWrapper } from './style';
import config from '../../../config/config';
import fileUploadToS3 from '../../../utility/fileUploadToS3';
const crypto = require('crypto');

const getPassword = (password) => {

  let salt = config.salt;
  let textParts = password.split('g');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join('g'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(salt), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
 
  return decrypted.toString();
}

const AddAdminUser = ({ visible, onCancel, userAction = 0, userData = null }) => {  // userAction: 0: add user, 1: edit user
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { authUser } = useSelector(state => {
    return {
      authUser: state.auth.user,
    };
  });

  const [state, setState] = useState( userAction === 0 ?    // state in which add admin user
    {
      visible,
      modalType: 'primary',
      checked: [],
      isFileLoading: false,
      selectedFile: null,
      imageUrl: `${config.bucket_url}/${config.general_avatar}`,
      userInfo: {
        name: "",
        email: "",
        password: "",
        role: null, // 0: Super-admin, 1: Editor
      }
    } :
    {   // state in which update admin user
      visible,
      modalType: 'primary',
      checked: [],
      isFileLoading: false,
      selectedFile: null,
      imageUrl: userData.avatar !== null && userData.avatar !== undefined ? userData.avatar.url : null,
      userInfo: {
        name: userData.name,
        email: userData.email,
        password: getPassword(userData.password),
        role: userData.role, // 0: Super-admin, 1: Editor
      }
    }
  );

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

  const handleOk = async () => {

    let name = form.getFieldValue("name");
    let email = form.getFieldValue("email");
    let password = form.getFieldValue("password");
    let role = form.getFieldValue("role");
    let media = {};

    if( name === {} || name === null || name === "" || name === undefined ) {
      notification['error'] ({
        message: 'Error',
        description: 'Please type the name!'
      });
      return;
    }
    
    if( email === {} || email === null || email === "" || email === undefined ) {
      notification['error'] ({
        message: 'Error',
        description: 'Please type the email!'
      });
      return;
    }
    
    if( password === {} || password === null || password === "" || password === undefined ) {
      notification['error'] ({
        message: 'Error',
        description: 'Please type the password!'
      });
      return;
    }
    
    if( role === {} || role === null || role === "" || role === undefined ) {
      notification['error'] ({
        message: 'Error',
        description: 'Please select the status!'
      });
      return;
    }

    //Code for avatar(whether uploading image or not)
    if(state.imageUrl !== null && state.imageUrl !== undefined) {
      let currentFile = state.selectedFile;

      let resultUpload =  await fileUploadToS3(currentFile);
      let {success, data, errMessage} =  resultUpload;
      if(!success) {
        notification['error'] ({
          message: 'Error',
          description: errMessage
        });
        return;
      }

      media = {
        name: data.key,
        url: data.location,
        type: 0,
        // relation: 0,
      }
    } else {
      media = null;
    }

    let newData = {
      name: name,
      email: email,
      password: password,
      role: role, // 0: Super-admin, 1: Editor
      media,
    }

    userAction === 0 ?
      actions.addUser(newData).then( res => {
        const { success, user, media } = res.data;
        if(success) {
          dispatch({
              type: ActionTypes.ADD_USER,
              data: user
          });

          if(media !== null) {    // if file was uploaded....
            dispatch({
              type: ActionTypes.ADD_MEDIA,
              data: media
            });
          }

          notification['success'] ({
            message: 'New User was created successfully',
            description: ''
          })              
        } else {
          dispatch({
              type: ActionTypes.USER_ERR,
              err: res.data.errMessage,
          });
          notification['error'] ({
            message: 'Error',
            description: res.data.errMessage
          })          
        }
      }) :
      actions.updateUser({
        name: name,
        email: email,
        password: password,
        role: role,
        _id: userData._id,
        media,
      }).then( res => {
        const { success, user, media, token } = res.data;
        if(success) {
          dispatch({
              type: ActionTypes.UPDATE_USER,
              data: user,
              token: token,
          });

          // if(media !== null) {    // if file was uploaded....
          //   dispatch({
          //     type: ActionTypes.UPDATE_MEDIA,
          //     media,
          //   });
          // }

          //If the info of logged in user was changed, update the token.
          if( authUser._id === user._id)
            actions.setAuthToken(token);

          notification['success'] ({
            message: 'User was updated successfully',
            description: ''
          })              
        } else {
          dispatch({
              type: ActionTypes.USER_ERR,
              err: res.data.errMessage,
          });
          notification['error'] ({
            message: 'Error',
            description: res.data.errMessage
          })          
        }
      });

    initializeFormData();
    onCancel();
  };

  const handleCancel = () => {
    initializeFormData();
    onCancel();
  };

  const initializeFormData = () => {
    form.setFieldsValue({
      ["name"]: null,
      ["email"]: null,
      ["password"]: null,
      ["role"]: null,
    })
  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    multiple: false,
    showUploadList: false,
    maxCount: 1,
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
      if (info.file.status === 'uploading') {
        setState({
          isFileLoading: true,
          visible: true,
        })
      }
      if (info.file.status === 'done' || info.file.status === 'error') {
        getBase64(info.file.originFileObj, imageUrl =>
          setState({
            imageUrl,
            selectedFile: info.file.originFileObj,
            isFileLoading: false,
            visible: true,
          }),
        )
      } 
    },
    onRemove(file) {
      setState({
        ...state,
        isFileLoading: false,
        visible: true,
        selectedFile: null,
      });
    }
  };

  return (
    <Modal
      type={state.modalType}
      title={userAction === 0 ? "Add Admin User" : "Update Admin User"}
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
          <Form form={form} name="addAdminUser" onFinish={handleOk} initialValues={state.userInfo}>
            <RecordFormWrapper>
              <figure className="pro-image align-center-v">
                <img
                  src={ (state.imageUrl === null || state.imageUrl === undefined) ? `${config.bucket_url}/${config.general_avatar}` : state.imageUrl }
                  alt=""
                />
                <figcaption>
                  <Upload {...props}>
                    <Link className="upload-btn" to="#">
                      <FeatherIcon icon="camera" size={16} />
                    </Link>
                  </Upload>
                  <div className="info">
                    <Heading as="h4">Profile Photo</Heading>
                  </div>
                  {state.isFileLoading && (                    
                    <div className="isUploadSpain">
                      <Spin />
                    </div>
                  )}
                </figcaption>
              </figure>
            </RecordFormWrapper>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="email" rules={[{ type: 'email', message: 'Email is not a valid email' }]} label="Email Address">
              <Input placeholder="sample@email.com" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  min: 6,
                  message: 'Enter a valid password. Min 6 characters long.',
                },
              ]}
              label="Password"
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item label="Status" name="role">
              <Radio.Group>
                <Radio value={1}>Editor</Radio>
                <Radio value={0}>Super-admin</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

AddAdminUser.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default AddAdminUser;
