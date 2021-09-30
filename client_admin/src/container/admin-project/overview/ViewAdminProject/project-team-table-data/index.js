import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Table, Avatar, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper, TableWrapper } from './styled';
import { Button } from '../../../../../components/buttons/buttons';
import Heading from '../../../../../components/heading/heading';
import { PageHeader } from '../../../../../components/page-headers/page-headers';
import AddProjectMemberTableData from './add-project-member-table-data';
import { ProjectHeader } from '../style';
import config from '../../../../../config/config';
import isValid from '../../../../../utility/isValid';
import * as actions from '../../../../../redux/actions';
import * as ActionTypes from '../../../../../redux/ActionTypes';

const ProjectTeamTableData = () => {
  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    visible: false,
    values: {},
    allMembers: [],
  });

  const { visible } = state;

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const dispatch = useDispatch();

  useEffect( () => {
    const makeTableData = async () => {
      try {
        let tempData = [];
        for( let i = 0 ; i < project.projectData.member_list.length; i ++ ) {
          tempData.push({
            key: project.projectData.member_list[i]._id,
            firstData: { 
              avatar: isValid(project.projectData.member_list[i].avatar) ? project.projectData.member_list[i].avatar.url : `${config.bucket_url}/${config.common_image}`,
              name: project.projectData.member_list[i].name,
            },
            position: isValid(project.projectData.member_list[i].position) ? project.projectData.member_list[i].position : "",
          })
        }
        setState({ ...state, allMembers: tempData });
      } catch (err) {
        console.log(err);
      }
    }
    makeTableData();
  }, [project]);

  const columnsSort = [
    {
      title: 'User',
      dataIndex: 'firstData',
      render: firstData => (
        <div className="user-info">
          <figure>
            <Avatar size={40} src={firstData.avatar} />
          </figure>
          <figcaption>
            <Heading className="user-name" as="h6">
              {firstData.name}
            </Heading>
          </figcaption>
        </div>
      )
    },
    {
      title: 'Description',
      dataIndex: 'position',
      render: position => (
        <span className="source">{ position }</span>
      )
    },
    {
      title: 'Actions',
      dataIndex: 'key',
      render: key => (
        <div className="table-actions">
          <Button className="btn-icon" type="info" to="#" shape="circle" onClick={() => updateMember(key)}>
            <FeatherIcon icon="edit" size={16} />
          </Button>
          <Button className="btn-icon" type="info" to="#" shape="circle" onClick={() => deleteMember(key)}>
            <FeatherIcon icon="trash-2" size={16} />
          </Button>
        </div>
      )
    },
  ];

  const updateMember = (memberId) => {
    
    // set member data
    let tempMemberData = project.projectData.member_list.filter(item => { return item._id === memberId });
    if(isValid(tempMemberData[0])) {
      dispatch({
        type: ActionTypes.SET_MEMBER,
        data: tempMemberData[0]
      });
      dispatch({
        type: ActionTypes.SET_MEMBER_ACTION,
        data: "update"
      });
      dispatch({
        type: ActionTypes.SET_MEMBER_ID,
        data: memberId
      });
      setState({
        ...state,
        visible: true,
      })
    } else {
      notification['error'] ({
        message: 'Error',
        description: "No Member Data or unknown error was occured while fetching member data!"
      })      
    }
  }

  const deleteMember = (_memberId) => {
    let projectId = project.projectData._id;
    let memberId = _memberId;
    actions.deleteProjectMember(projectId, memberId).then( res => {
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
          message: 'The member was deleted successfully',
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

  function onChange(pagination, filters, sorter, extra) {
    setState({ ...state, values: { pagination, filters, sorter, extra } });
  }

  const showModal = () => {
    dispatch({
      type: ActionTypes.SET_MEMBER,
      data: null
    });
    dispatch({
      type: ActionTypes.SET_MEMBER_ACTION,
      data: "create"
    });
    dispatch({
      type: ActionTypes.SET_MEMBER_ID,
      data: null
    });

    setState({
      ...state,
      visible: true,
    });
  };

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
    });
  };


  return (
    <>
      <ProjectHeader>
        <PageHeader
          title="Project team"
          buttons={[
            <Button onClick={showModal} key="1" type="primary" size="default">
              <FeatherIcon icon="plus" size={16} /> Add New User
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
                  dataSource={state.allMembers}
                  onChange={onChange}
                />
              </TableWrapper>
            </UserTableStyleWrapper>
          </Cards>
        </Col>
      </Row>
      {
        visible ?
          <AddProjectMemberTableData onCancel={onCancel} visible={visible} />
          :
          null 
      }
    </>
  );
};

export default ProjectTeamTableData;
