import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col, Table, Avatar, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper, TableWrapper } from './styled';
import { Button } from '../../../../../components/buttons/buttons';
import Heading from '../../../../../components/heading/heading';
import { PageHeader } from '../../../../../components/page-headers/page-headers';
import { ProjectHeader } from '../style';
import config from '../../../../../config/config';
import isValid from '../../../../../utility/isValid';
import * as actions from '../../../../../redux/actions';
import * as ActionTypes from '../../../../../redux/ActionTypes';

var moment = require('moment');

const GuidesTableData = () => {

  const history = useHistory();
  
  const dispatch = useDispatch();
  
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
    allGuides: [],
  });

  useEffect( () => {
    const makeTableData = async () => {
      try {
        let tempData = [];
        for( let i = 0 ; i < project.projectData.guide_list.length; i ++ ) {
          tempData.push({
            key: project.projectData.guide_list[i]._id,
            firstData: { 
              media: isValid(project.projectData.guide_list[i].media) ? project.projectData.guide_list[i].media.url : `${config.bucket_url}/${config.common_image}`,
              title: project.projectData.guide_list[i].title,
            },
            added: moment(project.projectData.guide_list[i].created_time).format("DD MMM YYYY"),
          })
        }
        setState({ ...state, allGuides: tempData });
      } catch (err) {
        console.log(err);
      }
    }
    makeTableData();
  }, [project]);

  const columnsSort = [
    {
      title: 'Name',
      dataIndex: 'firstData',
      render: firstData => (
        <div className="user-info">
          <figure>
            <Avatar size={40} src={firstData.media} />
          </figure>
          <figcaption>
            <Heading className="user-name" as="h6">
              {firstData.title}
            </Heading>
          </figcaption>
        </div>
      )
    },
    {
      title: 'Date added',
      dataIndex: 'added',
      render: added => (
        <span className="source">{ added }</span>
      )
    },
    {
      title: 'Actions',
      dataIndex: 'key',
      render: key => (
        <div className="table-actions">
          <Button className="btn-icon" type="info" to="#" shape="circle" onClick={() => updateGuide(key)}>
            <FeatherIcon icon="edit" size={16} />
          </Button>
          <Button className="btn-icon" type="info" to="#" shape="circle" onClick={() => deleteGuide(key)}>
            <FeatherIcon icon="trash-2" size={16} />
          </Button>
        </div>
      )
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    setState({ ...state, values: { pagination, filters, sorter, extra } });
  }

  const addGuide = () => {
    dispatch({
      type: ActionTypes.SET_GUIDE,
      data: null
    });
    dispatch({
      type: ActionTypes.SET_GUIDE_ACTION,
      data: "create"
    });
    dispatch({
      type: ActionTypes.SET_GUIDE_ID,
      data: null
    });
    history.push(`${window.location.pathname}/add-guide`);
  }

  const updateGuide = (guideId) => {
    
    // set guide data
    let tempGuideData = project.projectData.guide_list.filter(item => { return item._id === guideId });
    if(isValid(tempGuideData[0])) {
      dispatch({
        type: ActionTypes.SET_GUIDE,
        data: tempGuideData[0]
      });
      dispatch({
        type: ActionTypes.SET_GUIDE_ACTION,
        data: "update"
      });
      dispatch({
        type: ActionTypes.SET_GUIDE_ID,
        data: guideId
      });
      history.push(`${window.location.pathname}/add-guide`);
    } else {
      notification['error'] ({
        message: 'Error',
        description: "No Guide Data or unknown error was occured while fetching guide data!"
      })      
    }
  }

  const deleteGuide = (_guideId) => {
    let projectId = project.projectData._id;
    let guideId = _guideId;
    actions.deleteProjectGuide(projectId, guideId).then( res => {
      const { success, isExistingProject, updated_project } = res.data;
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
          message: 'The guide was deleted successfully',
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

  return (
    <>
    <ProjectHeader>
      <PageHeader
        title="Guides"
        buttons={[
          <Button onClick={addGuide} key="1" type="primary" size="default">
            <FeatherIcon icon="plus" size={16} /> Add New Guide
          </Button>,
        ]}
      />
    </ProjectHeader>
      <Row>
        <Col xs={24}>
          <Cards title="" headless>
            <UserTableStyleWrapper>
              <TableWrapper className="table-responsive">
                <Table
                  className="table-responsive"
                  pagination={ false }
                  columns={columnsSort}
                  dataSource={state.allGuides}
                  onChange={onChange}
                />
              </TableWrapper>
            </UserTableStyleWrapper>
          </Cards>
        </Col>
      </Row>
    </>
  );
};

export default GuidesTableData;
