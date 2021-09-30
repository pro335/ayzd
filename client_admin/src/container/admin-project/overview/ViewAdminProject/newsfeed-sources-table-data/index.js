import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Table, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper, TableWrapper } from './styled';
import { Button } from '../../../../../components/buttons/buttons';
import { PageHeader } from '../../../../../components/page-headers/page-headers';
import AddSource from '../../../../../components/mine/AddSource';
import { ProjectHeader } from '../style';
import isValid from '../../../../../utility/isValid';
import * as actions from '../../../../../redux/actions';
import * as ActionTypes from '../../../../../redux/ActionTypes';

const NewsfeedSourcesTableData = () => {

  const dispatch = useDispatch();
  
  const { project, newsfeedSources } = useSelector(state => {
    return {
      project: state.project,
      newsfeedSources: state.newsfeedSource.newsfeedSources,
    };
  });
  
  const [state, setState] = useState({
    visible: false,
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
    // canChooseProject: false, 
    newsfeedSourceAction: 0, 
    newsfeedSourceData: null,
    newsfeedSourceList: [],
  });

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

  const { visible } = state;

  const columnsSort = [
    {
      title: 'Source',
      dataIndex: 'link',
      render: link => (
        <span className="source">{ link }</span>
      )
    },
    {
      title: 'Keywords',
      dataIndex: 'keywords',
      render: keywords => (
        <span className="source">{ keywords }</span>
      )
    },
    {
      title: 'Actions',
      dataIndex: 'key',
      render: key => (
        <div className="table-actions">
          <Button className="btn-icon" type="info" to="#" shape="circle" onClick={() => editNewsfeed(key) }>
            <FeatherIcon icon="edit" size={16} />
          </Button>
          <Button className="btn-icon" type="info" to="#" shape="circle" onClick={() => deleteNewsfeed(key) }>
            <FeatherIcon icon="trash-2" size={16} />
          </Button>
        </div>
      )
    },
  ];

  useEffect(() => {
    let temp_newsfeedSource_list = [];
    for(let i = 0 ; i < project.projectData.newsfeedSource_list.length ; i ++ ) {
      let item = project.projectData.newsfeedSource_list[i];
      let one_newsfeed = {
        key: item._id,
        link: isValid(item.link) ? item.link : "",
        keywords: isValid(item.keyword_list) ? item.keyword_list.join(";") : "",
      }
      temp_newsfeedSource_list.push(one_newsfeed);
    }
    
    setState({
      ...state,
      newsfeedSourceList: temp_newsfeedSource_list
    })
  }, [project, newsfeedSources])

  function onChange(pagination, filters, sorter, extra) {
    setState({ ...state, values: { pagination, filters, sorter, extra } });
  }

  const editNewsfeed = (_id) => {
    // let canChooseProject = false; 
    let newsfeedSourceAction = 1; 
    let newsfeedSourceData = null;
    let foundIndex = newsfeedSources.findIndex(x => x._id === _id);
    if(foundIndex !== -1)
      newsfeedSourceData = newsfeedSources[foundIndex];

    if(isValid(newsfeedSourceData)) {
      setState({
        ...state,
        visible: true,
        // canChooseProject: canChooseProject,
        newsfeedSourceAction: newsfeedSourceAction,
        newsfeedSourceData: newsfeedSourceData,
      });

    }
  }

  const deleteNewsfeed = (_id) => {
    actions.deleteNewsfeedSource(_id).then( res => {
      const { success, newsfeedSource, project } = res.data;
      if(success) {
        dispatch({
            type: ActionTypes.DELETE_NEWS_FEED_SOURCE,
            data: newsfeedSource
        });
        dispatch({
          type: ActionTypes.UPDATE_PROJECT,
          data: project
        });
        dispatch({
          type: ActionTypes.SET_PROJECT,
          data: project
        });

        notification['success'] ({
          message: 'A newsfeed Source was removed successfully',
          description: ''
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
  }

  const showModal = () => {
    // let canChooseProject = false; 
    let newsfeedSourceAction = 0; 
    let newsfeedSourceData = null;

    setState({
      ...state,
      visible: true,
      // canChooseProject,
      newsfeedSourceAction,
      newsfeedSourceData,
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
          title="Newsfeed sources"
          buttons={[
            <Button onClick={showModal} key="1" type="primary" size="default">
              <FeatherIcon icon="plus" size={16} /> Add source
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
                  dataSource={state.newsfeedSourceList}
                  onChange={onChange}
                />
              </TableWrapper>
            </UserTableStyleWrapper>
          </Cards>
        </Col>
      </Row>
      {
        visible ?
          <AddSource onCancel={onCancel} visible={visible} canChooseProject={true} newsfeedSourceAction={state.newsfeedSourceAction} newsfeedSourceData={state.newsfeedSourceData} />
          :
          null 
      }
    </>
  );
};

export default NewsfeedSourcesTableData;
