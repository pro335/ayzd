import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col, Table, Avatar, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper, TableWrapper } from './styled';
import { Button } from '../../../components/buttons/buttons';
import Heading from '../../../components/heading/heading';
import * as ActionTypes from '../../../redux/ActionTypes';
import isValid from '../../../utility/isValid';
import config from '../../../config/config';

var moment = require('moment');

const TableData = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { path } = props;

  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
    allProjects: [],
  });

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  useEffect( () => {
    const makeTableData = async () => {
      try {
        let tempData = [];
        for( let i = 0 ; i < project.projects.length; i ++ ) {
          tempData.push({
            key: project.projects[i]._id,
            firstData: { 
              main_image: isValid(project.projects[i].main_image) ? project.projects[i].main_image.url : `${config.bucket_url}/${config.common_image}`,
              name: project.projects[i].name,
            },
            category: isValid(project.projects[i].category) ? project.projects[i].category.name : "",
            added: moment(project.projects[i].created_time).format("DD MMM YYYY"),
          })
        }
        setState({ ...state, allProjects: tempData });
      } catch (err) {
        console.log(err);
      }
    }
    makeTableData();
  }, [project]);

  const columnsSort = [
    {
      title: 'Project',
      dataIndex: 'firstData',
      render: firstData => (
        <div className="user-info">
          <figure>
            <Avatar 
              size={40}
              src={firstData.main_image} 
              alt=""
            />
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
      title: 'Category',
      dataIndex: 'category',
      render: category => (
        <span className="source">{ category }</span>
      )
    },
    {
      title: 'Added',
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
          <Button className="btn-icon" type="info" shape="circle" onClick={() => viewProject(key) }>
            <FeatherIcon icon="eye" size={16} />
          </Button>
          <Button className="btn-icon" type="info" shape="circle" onClick={() => editProject(key) }>
            <FeatherIcon icon="edit" size={16} />
          </Button>
        </div>
      )
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    setState({ ...state, values: { pagination, filters, sorter, extra } });
  }

  const viewProject = (key) => {
    dispatch({
      type: ActionTypes.SET_PROJECT_ID,
      data: key
    });
    dispatch({
      type: ActionTypes.SET_PROJECT_ACTION,
      data: 1   // view project
    });

    let data = project.projects.filter(function(item) {
      return item._id === key;
    });
    if(isValid(data)) {
      dispatch({
        type: ActionTypes.SET_PROJECT,
        data: data[0]
      });
    }

    history.push(`${path}/view`);
  }

  const editProject = (key) => {
    let data = project.projects.filter(function(item) {
      return item._id === key;
    });

    if(isValid(data[0])) {
      dispatch({
        type: ActionTypes.SET_PROJECT,
        data: data[0]
      });
      dispatch({
        type: ActionTypes.SET_PROJECT_ID,
        data: key
      });
      dispatch({
        type: ActionTypes.SET_PROJECT_ACTION,
        data: 2   // edit project
      });

      let project_create_method = isValid(data[0].slug) ? 0 : 1;    // 0: from coinranking url, 1: manual input
      dispatch({
        type: ActionTypes.SET_PROJECT_CREATE_METHOD,
        data: project_create_method
      });
    }
    history.push(`${path}/view/add`);
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
                  dataSource={state.allProjects}
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

export default TableData;
