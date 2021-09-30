import React, { lazy, useState, useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Spin, Select } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Switch, useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import { ProjectHeader, ProjectSorting } from './style';
import { Main } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import TableData from './table-data/TableData';
import { Button } from '../../components/buttons/buttons';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import AddAdminProjectDlg from './overview/AddAdminProjectDlg';

const AdminProject = ({ match }) => {
  const dispatch = useDispatch();
  const searchData = useSelector(state => state.headerSearchData);
  const { path } = match;
  const history = useHistory();
  
  const { projectList } = useSelector(state => {
    return {
      projectList: state.project.projects,
    };
  });

  const [state, setState] = useState({
    notData: searchData,
    visible: false,
    categoryActive: 'all',
  });

  const { notData, visible } = state;
  const handleSearch = searchText => {
    const data = searchData.filter(item => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const onSorting = selectedItem => {
    dispatch({
      type: ActionTypes.SORTING_PROJECT_BY,
      sortBy: selectedItem
    });
  };

  const addAdminProject = () => {
    dispatch({
      type: ActionTypes.SET_PROJECT_ID,
      data: null,
    });
    dispatch({
      type: ActionTypes.SET_PROJECT_ACTION,
      data: 0   // create project
    });
    // history.push(`${path}/view/add`);

    setState({
      ...state,
      visible: true,
    });
  }

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
    });
  }

  return (
    <>
      <ProjectHeader>
        <PageHeader
          title="Projects"
          subTitle={<>{projectList.length} Project(s)</>}
          buttons={[
            <Button onClick={addAdminProject} key="1" type="primary" size="default">
              <FeatherIcon icon="plus" size={16} /> Create Projects
            </Button>,
          ]}
        />
      </ProjectHeader>
      <Main>
        <Row gutter={25}>
          <Col xs={24}>
            <ProjectSorting>
              <div className="project-sort-bar">
                {/* <div className="project-sort-search">
                  <AutoComplete onSearch={handleSearch} dataSource={notData} placeholder="Search projects" patterns />
                </div> */}
                <div className="project-sort-group">
                  <div className="sort-group">
                    <span>Sort By:</span>
                    <Select onChange={onSorting} defaultValue="">
                      <Select.Option value="name">Name</Select.Option>
                      {/* <Select.Option value="category">Project Category</Select.Option> */}
                      <Select.Option value="created_time">Added</Select.Option>
                    </Select>
                  </div>
                </div>
              </div>
            </ProjectSorting>
          </Col>
          <Col xs={24}>
            <div>
              <Switch>
                <Suspense
                  fallback={
                    <div className="spin">
                      <Spin />
                    </div>
                  }
                >
                  <TableData path={path} />
                </Suspense>
              </Switch>
            </div>
          </Col>
        </Row>
        {
          visible ?
            <AddAdminProjectDlg onCancel={onCancel} visible={visible} userAction={0} userData={null} match={match} />
            :
            null 
        }
      </Main>
    </>
  );
};

AdminProject.propTypes = {
  match: propTypes.object,
};

export default AdminProject;
