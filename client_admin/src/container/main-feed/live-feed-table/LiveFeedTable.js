import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Table, Select, Avatar, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper, TableWrapper } from './styled';
import { Button } from '../../../components/buttons/buttons';
import * as actions from '../../../redux/actions';
import * as ActionTypes from '../../../redux/ActionTypes';
import reduceTextLengh from '../../../utility/reduceTextLengh';
import isValid from '../../../utility/isValid';

var moment = require('moment');

const { Option } = Select;

const LiveFeedTable = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
    allLivefeeds: [],
    livefeedData: null,
    currentLivefeedId: null,
  });

  const { livefeeds } = useSelector(state => {
    return {
      livefeeds: state.livefeed.livefeeds,
    };
  });

  useEffect( () => {
    const makeTableData = async () => {
      try {
        let tempData = [];
        for( let i = 0 ; i < livefeeds.length; i ++ ) {
          tempData.push({
            first_cell: {
              title: livefeeds[i].title,
              description: livefeeds[i].description,
              media: livefeeds[i].media,
            },
            link: livefeeds[i].link,
            tag: livefeeds[i].tag,
            created_time: livefeeds[i].created_time,
            key: livefeeds[i]._id,
          })
        }
        setState({ ...state, allLivefeeds: tempData });
      } catch (err) {
        console.log(err);
      }
    }
    makeTableData();
  }, [livefeeds]);

  const columnsSort = [
    {
      title: 'News name',
      dataIndex: 'first_cell',
      // ellipsis: true,
      render: first_cell => (
          <div className="user-info">
            <figure>
              <Avatar 
                size={40}
                src={first_cell.media} 
                alt=""
                // onError={(e) => addDefaultSrc(e)}
              />
            </figure>
            <figcaption>
              <p className="user-name">
                { reduceTextLengh(first_cell.title, 30) }
              </p>
              <span className="user-designation">{ reduceTextLengh(first_cell.description, 40) }</span>
            </figcaption>
          </div>
      ),
    },
    {
      title: 'Source',
      dataIndex: 'link',
      // ellipsis: true,
      render: link => (
        <span className="source"><a href={link} target="_blank">{ reduceTextLengh(link, 25) }</a></span>
      )
    },
    {
      title: 'Time added',
      dataIndex: 'created_time',
      // ellipsis: true,
      render: created_time => (
        <span className="source">{ moment(created_time).fromNow() }</span>
      )
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      // ellipsis: true,
      render: tag => (
        <Select style={{ width: '100%' }} value={tag} onChange={handleTagChange}>
          <Option key={0} value={0}>{" "}</Option>
          <Option key={1} value={1}>{"Bearish"}</Option>
          <Option key={2} value={2}>{"Bullish"}</Option>
          <Option key={3} value={3}>{"LMAO"}</Option>
          <Option key={4} value={4}>{"Investment"}</Option>
          <Option key={5} value={5}>{"Interesting"}</Option>
          <Option key={6} value={6}>{"Hot"}</Option>
        </Select>

      )
    },
    {
      title: '',
      dataIndex: 'key',
      render: (key) => (
        <div className="table-actions">
          <Button className="btn-icon" type="danger" onClick={() => deleteLivefeed(key)} shape="circle">
            <FeatherIcon icon="trash-2" size={16} />
          </Button>
        </div>
      )
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    setState({ ...state, values: { pagination, filters, sorter, extra } });
  }

  const handleTagChange = (value) => {
    let foundIndex = livefeeds.findIndex(x => x._id === state.currentLivefeedId);
    let currentLivefeed = null;
    if(foundIndex !== -1)
      currentLivefeed = livefeeds[foundIndex];
    if(!isValid(currentLivefeed))
      return;
    currentLivefeed = {
      ...currentLivefeed,
      tag: value,
    }
    
    actions.updateLivefeed(currentLivefeed).then( res => {
      const { success, livefeed, livefeeds } = res.data;
      if(success) {
        dispatch({
            type: ActionTypes.UPDATE_LIVE_FEED,
            data: livefeed
        });

        notification['success'] ({
          message: 'Livefeed was updated successfully!',
          description: ''
        })              
      } else {
        dispatch({
            type: ActionTypes.LIVE_FEED_ERR,
            err: res.data.errMessage,
        });
        dispatch({
          type: ActionTypes.SET_ALL_LIVE_FEEDS,
          data: livefeeds
        });
        notification['warning'] ({
          message: res.data.errMessage,
          description: ''
        })          
      }
    });
  }

  const deleteLivefeed = (_id) => {
    actions.deleteLivefeed(_id).then( res => {
      const { success, livefeed, livefeeds } = res.data;
      if(success) {
        dispatch({
            type: ActionTypes.DELETE_LIVE_FEED,
            data: livefeed
        });

        notification['success'] ({
          message: 'A livefeed was removed successfully',
          description: ''
        })              
      } else {
        dispatch({
            type: ActionTypes.LIVE_FEED_ERR,
            err: res.data.errMessage,
        });
        dispatch({
          type: ActionTypes.SET_ALL_LIVE_FEEDS,
          data: livefeeds
        });
        notification['warning'] ({
          message: res.data.errMessage,
          description: ''
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
                  dataSource={state.allLivefeeds}
                  onChange={onChange}
                  scroll={{ x: 400 }}
                  onRow={(record, rowIndex) => {
                    return {
                        onClick: event => setState({ ...state, currentLivefeedId: record.key })
                    }
                  }}                  
                />
              </TableWrapper>
            </UserTableStyleWrapper>
          </Cards>
        </Col>
      </Row>
    </>
  );
};

export default LiveFeedTable;
