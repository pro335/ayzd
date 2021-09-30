import React, { useState, useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Spin, Select } from 'antd';
import { Switch, NavLink } from 'react-router-dom';
import propTypes from 'prop-types';
import { ProjectHeader, ProjectSorting } from './style';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Main } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import LiveFeedTable from './live-feed-table/LiveFeedTable';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';

const MainFeed = ({ match }) => {
  const dispatch = useDispatch();
  const searchData = useSelector(state => state.headerSearchData);
  const { path } = match;
  const [state, setState] = useState({
    notData: searchData,
    visible: false,
    categoryActive: 'all',
  });

  const { notData } = state;
  const handleSearch = searchText => {
    const data = searchData.filter(item => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const onSorting = selectedItem => {
    dispatch({
      type: ActionTypes.SORTING_LIVE_FEED_BY,
      sortBy: selectedItem
    });
  };

  return (
    <>
      <ProjectHeader>
        <PageHeader
          ghost
          title="Main feed"
        />
      </ProjectHeader>
      <Main>
        <Row gutter={25}>
          <Col xs={24}>
            <ProjectSorting>
              <div className="project-sort-bar">
                <div className="project-sort-nav">
                  <nav>
                    <ul>
                      <li className={'active'}>
                        <NavLink to={`${path}`}>
                          Live feed
                        </NavLink>
                      </li>
                      <li className={'deactivate'}>
                        <NavLink to={`${path}/sources`}>
                          Sources
                        </NavLink>       
                      </li>
                    </ul>
                  </nav>
                </div>
                {/* <div className="project-sort-search">
                  <AutoComplete onSearch={handleSearch} dataSource={notData} placeholder="Search projects" patterns />
                </div> */}
                <div className="project-sort-group">
                  <div className="sort-group">
                    <span>Sort By:</span>
                    <Select onChange={onSorting} defaultValue="">
                      <Select.Option value="title">News name</Select.Option>
                      <Select.Option value="created_time">Time added</Select.Option>
                      <Select.Option value="link">Source</Select.Option>
                    </Select>
                  </div>
                </div>
              </div>
            </ProjectSorting>
            <div>
              <Switch>
                <Suspense
                  fallback={
                    <div className="spin">
                      <Spin />
                    </div>
                  }
                >
                  <LiveFeedTable />
                </Suspense>
              </Switch>
            </div>
          </Col>
        </Row>
      </Main>
    </>
  );
};

MainFeed.propTypes = {
  match: propTypes.object,
};

export default MainFeed;
