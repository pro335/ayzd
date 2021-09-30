import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Table, Avatar, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper, TableWrapper } from './styled';
import { Button } from '../../../../../components/buttons/buttons';
import Heading from '../../../../../components/heading/heading';
import { PageHeader } from '../../../../../components/page-headers/page-headers';
import AddMediaTableData from '../add-media-table-data';
import { ProjectHeader } from '../style';
import isValid from '../../../../../utility/isValid';
import config from '../../../../../config/config';
import * as actions from '../../../../../redux/actions';
import * as ActionTypes from '../../../../../redux/ActionTypes';

const MediaTableData = () => {

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
    visible: false,
    media: {
      mediaCategory: 1,   //  mediaCategory: 0: main image, 1: media, default: 1,
      mediaId: 0,  //  mediaId: the object id of media, default: 0,
      mediaAction: 1,     //  mediaAction: 0: add, 1: update, default: 1
    },
  });

  const { visible } = state;

  const getTypefromValue = (type) => {
    let szVal = "";
    switch(type) {
      case 0:
        szVal = "Image";
        break;
      case 1:
        szVal = "Video";
        break;
      case 2:
        szVal = "Other";
        break;
      default:
        szVal = "Image";
        break;
    }
    return szVal;
  }

  const columnsSort = [
    {
      title: 'Media',
      dataIndex: 'first_cell',
      render: first_cell => (
        <div className="user-info">
          <figure>
            <Avatar size={40} src={first_cell.url} /> {/* "https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png" /> */}
          </figure>
          <figcaption>
            <Heading className="user-name" as="h6">
              {first_cell.name}
            </Heading>
          </figcaption>
        </div>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: type => (
        <span className="source">{ type }</span>
      )
    },
    {
      title: 'Actions',
      dataIndex: 'key',
      render: key => (
        <div className="table-actions">
          <Button className="btn-icon" type="info" to="#" shape="circle" onClick={() => updateMedia(key)}>
            <FeatherIcon icon="edit" size={16} />
          </Button>
          <Button className="btn-icon" type="info" to="#" shape="circle" onClick={() => deleteMedia(key)}>
            <FeatherIcon icon="trash-2" size={16} />
          </Button>
        </div>
      )
    },
  ];

  const dataSort = project.projectData.media_list.map(item => {
    let one_media =
    {
      key: item._id,
      first_cell: {
        name: isValid(item.name) ? item.name : "",
        url: isValid(item.url) && item.type === 0 ? item.url : `${config.bucket_url}/${config.common_image}`,
      },
      type: isValid(item.type) ? getTypefromValue(item.type) : ""
    }
    return one_media;
  });

  function onChange(pagination, filters, sorter, extra) {
    setState({ ...state, values: { pagination, filters, sorter, extra } });
  }

  const addNewMedia = () => {
    setState({
      ...state,
      visible: true,
      media: {
        mediaCategory: 1,
        mediaId: 0,
        mediaAction: 0
      },
    });
  };

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
    });
  };

  const updateMedia = (_id) => {
    setState({
      ...state,
      visible: true,
      media: {
        mediaCategory: 1,
        mediaId: _id,
        mediaAction: 1
      },
    });
  }

  const deleteMedia = (_id) => {
    let projectId = project.projectData._id;
    let mediaId = _id;
    actions.deleteProjectMedia(projectId, mediaId).then( res => {
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
    });
  }

  return (
    <>
      <ProjectHeader>
        <PageHeader
          title="Media"
          buttons={[
            <Button onClick={addNewMedia} key="1" type="primary" size="default">
              <FeatherIcon icon="plus" size={16} /> Add New Media
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
                  dataSource={dataSort}
                  onChange={onChange}
                />
              </TableWrapper>
            </UserTableStyleWrapper>
          </Cards>
        </Col>
      </Row>
      {
        visible ?
          <AddMediaTableData onCancel={onCancel} visible={visible} mediaCategory={state.media.mediaCategory} mediaId={state.media.mediaId} mediaAction={state.media.mediaAction} />
          :
          null
      }
    </>
  );
};

export default MediaTableData;
