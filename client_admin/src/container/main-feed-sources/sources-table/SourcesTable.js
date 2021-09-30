import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Table, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper, TableWrapper } from './styled';
import { Button } from '../../../components/buttons/buttons';
import * as actions from '../../../redux/actions';
import * as ActionTypes from '../../../redux/ActionTypes';
import AddSource from '../../../components/mine/AddSource';

const SourcesTable = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
    allNewsfeedSources: [],
    newsfeedSourceData: null,
    visible: false,
  });

  const { newsfeedSources } = useSelector(state => {
    return {
      newsfeedSources: state.newsfeedSource.newsfeedSources,
    };
  });

  useEffect( () => {
    const makeTableData = async () => {
      try {
        let tempData = [];
        for( let i = 0 ; i < newsfeedSources.length; i ++ ) {
          tempData.push({
            key: newsfeedSources[i]._id,
            link: newsfeedSources[i].link,
            project: newsfeedSources[i].project
          })
        }

        setState({ ...state, allNewsfeedSources: tempData });
      } catch (err) {
        console.log(err);
      }
    }
    makeTableData();
  }, [newsfeedSources]);

  const { visible, newsfeedSourceData } = state;

  const columnsSort = [
    {
      title: 'Source',
      dataIndex: 'link',
      render: link => (
        <span className="source">{ link }</span>
      )
    },
    {
      title: 'Project',
      dataIndex: 'project',
      render: project => (
        <span className="source">{ project !== null && project !== undefined && project !== {} ? project.name : "" }</span>
      )
    },
    {
      title: 'Actions',
      dataIndex: 'key',
      render: key => (
        <div className="table-actions">
          <Button className="btn-icon" type="info" onClick={() => updateNewsfeedSource(key)} shape="circle">
            <FeatherIcon icon="edit" size={16} />
          </Button>
          <Button className="btn-icon" type="danger" onClick={() => deleteNewsfeedSource(key)} shape="circle">
            <FeatherIcon icon="trash-2" size={16} />
          </Button>
        </div>
      )
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    setState({ ...state, values: { pagination, filters, sorter, extra } });
  }

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
    });
  }

  const updateNewsfeedSource = (_id) => {

    let tempNewsfeedSourceData = null;
    let foundIndex = newsfeedSources.findIndex(x => x._id === _id);
    if(foundIndex !== -1)
      tempNewsfeedSourceData = newsfeedSources[foundIndex];

    setState({ ...state, newsfeedSourceData: tempNewsfeedSourceData, visible: true });
  }
  
  const deleteNewsfeedSource = (_id) => {
    actions.deleteNewsfeedSource(_id).then( res => {
      const { success, newsfeedSource } = res.data;
      if(success) {
        dispatch({
            type: ActionTypes.DELETE_NEWS_FEED_SOURCE,
            data: newsfeedSource
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

  return (
    <>
      <Row>
        <Col xs={24}>
          <Cards title="" headless>
            <UserTableStyleWrapper>
              <TableWrapper className="table-responsive">
                <Table
                  className="table-responsive"
                  pagination={{
                    position: ['none', 'bottomLeft'],
                    defaultPageSize: 20,
                    showSizeChanger: true,
                    pageSizeOptions: [10, 20, 50, 100]
                  }}
                  columns={columnsSort}
                  dataSource={state.allNewsfeedSources}
                  onChange={onChange}
                />
              </TableWrapper>
            </UserTableStyleWrapper>
          </Cards>
        </Col>
      </Row>
      {
        visible ?
          <AddSource onCancel={onCancel} visible={visible} newsfeedSourceAction={1} newsfeedSourceData={state.newsfeedSourceData} />
          :
          null 
      }
    </>
  );
};

export default SourcesTable;
