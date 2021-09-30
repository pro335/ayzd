import React, { useState, useEffect } from 'react';
import { Form, Input, Select, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';
import { Button } from '../../buttons/buttons';
import { Modal } from '../../modals/antd-modals';
import { BasicFormWrapper } from '../../../container/styled';
import * as actions from '../../../redux/actions';
import * as ActionTypes from '../../../redux/ActionTypes';
import isValid from '../../../utility/isValid';

const { Option } = Select;

const AddSource = ({ visible, onCancel, canChooseProject = true, newsfeedSourceAction = 0, newsfeedSourceData = null }) => {

  /**
   * Description about the addsource params
   * 
   * canChooseProject: can choose project or not
   *    true: show the project category selection, false: hide the project category selection   default: true
   * 
   * newsfeedSourceAction: 0: add newsfeed, 1: edit newsfeed, default: 0
   * newsfeedSourceData: the data of newsfeed, default: null
   * 
   */

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { projects, project_id } = useSelector(state => {
    return {
      projects: state.project.projects,
      project_id: state.project.project_id,
    };
  });

  const [state, setState] = useState({
    visible,
    modalType: 'primary',
    checked: [],
    initialData: {
      link: newsfeedSourceAction === 0 ? "" : newsfeedSourceData.link,
      project: /*newsfeedSourceAction === 0 || !isValid(newsfeedSourceData.project)*/ canChooseProject && isValid(newsfeedSourceData.project) ? newsfeedSourceData.project._id : "",
      keyword: newsfeedSourceAction === 0 ? "" : newsfeedSourceData.keyword_list.join(";"),
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

  const handleOk = () => {

    let link = form.getFieldValue("link");
    let project = canChooseProject ? form.getFieldValue("project") : "";
    let szKeyword = form.getFieldValue("keyword");

    if( !isValid(link) ) {
      notification['error'] ({
        message: 'Error',
        description: 'Please type the link!'
      });
      return;
    }

    // if( !isValid(project) ){
    //   notification['error'] ({
    //     message: 'Error',
    //     description: 'Please select the project!'
    //   });
    //   return;
    // }

    // Get the list of the keywords 
    let keyword_list = (szKeyword === null || szKeyword === "" || szKeyword === undefined) ? [] : szKeyword.split(";");

    // filter(remove empty string) in the list of the keywords
    keyword_list = keyword_list.filter(function(item) {
      return item !== "" && item !== null;
    });

    let newData = {
      link: link,
      keyword_list: keyword_list
    }

    if(canChooseProject) {
      newData = {
        ...newData,
        project: project
      }
    }

    newsfeedSourceAction === 0 ?
      actions.addNewsfeedSource(newData).then( res => {
        const { success, newsfeedSource, livefeeds, isExistingProject, updated_project } = res.data;
        if(success) {
          dispatch({
              type: ActionTypes.ADD_NEWS_FEED_SOURCE,
              data: newsfeedSource
          });

          dispatch({
              type: ActionTypes.ADD_LIVE_FEED,
              data: livefeeds
          });

          if(isExistingProject) {   // isExisitingProject: add or update in project page(not newsfeedSource page)
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
            message: 'Newsfeed source was created successfully!',
            description: `${livefeeds.length} Live feeds was added.`
          })              
        } else {
          dispatch({
              type: ActionTypes.NEWS_FEED_SOURCE_ERR,
              err: res.data.errMessage,
          });
          notification['error'] ({
            message: 'Error',
            description: res.data.errMessage
          })          
        }
      }) : 
      actions.updateNewsfeedSource({
        link: link,
        project: project,
        keyword_list: keyword_list,
        _id: newsfeedSourceData._id
      }).then( res => {
        const { success, newsfeedSource, livefeeds, isExistingProject, updated_project } = res.data;
        console.log("livefeeds", livefeeds);
        if(success) {
          dispatch({
            type: ActionTypes.UPDATE_NEWS_FEED_SOURCE,
            data: newsfeedSource
          });

          dispatch({
            type: ActionTypes.ALL_LIVE_FEEDS,
            data: livefeeds
          });

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
            message: 'Newsfeed source was updated successfully!',
            description: ``
          })       
        } else {
          dispatch({
            type: ActionTypes.NEWS_FEED_SOURCE_ERR,
            err: res.data.errMessage,
          });
          notification['error'] ({
            message: 'Error',
            description: res.data.errMessage
          })          
        }
      });

      handleCancel();
  };

  const handleCancel = () => {
    initializeFormData();
    onCancel();
  };

  const initializeFormData = () => {
    form.setFieldsValue({
      ["link"]: "",
      ["keyword"]: "",
      ["project"]: null,
    })
  }

  let title = newsfeedSourceAction === 0 ? "Add" : "Update";
  title += " Rss Source";

  return (
    <Modal
      type={state.modalType}
      title={title}
      visible={state.visible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button size="default" type="primary" key="submit" onClick={handleOk}>
            {title}
          </Button>
          <Button size="default" type="white" key="back" outlined onClick={handleCancel}>
            Cancel
          </Button>
        </div>,
      ]}
      onCancel={handleCancel}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form form={form} name="addSource" onFinish={handleOk} initialValues={state.initialData}>
            <Form.Item name="link" label="">
              <Input placeholder="Rss link" />
            </Form.Item>
            <Form.Item name="keyword" label="">
              <Input placeholder="Keywords" />
            </Form.Item>
            {canChooseProject === true ? (
              <Form.Item name="project" label="">
                <Select style={{ width: '100%' }}>
                  {projects.map(item => (
                    <Option key={item._id} value={item._id}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            ) : null}
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

AddSource.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default AddSource;
