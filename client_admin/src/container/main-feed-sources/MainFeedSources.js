import React, { useState, useEffect, useContext, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Switch, NavLink, useRouteMatch, useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import { ProjectHeader, ProjectSorting } from './style';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Main } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import SourcesTable from './sources-table/SourcesTable';
import { Button } from '../../components/buttons/buttons';
import AddSource from '../../components/mine/AddSource';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';

const MainFeedSources = ({ match }) => {
  const dispatch = useDispatch();
  const searchData = useSelector(state => state.headerSearchData);
  const { path } = useRouteMatch();

  const history = useHistory();
  
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

  const showModal = () => {
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
                      <li className={'deactivate'}>
                        <span className="live-feed-link" onClick={() => history.goBack()}>
                          Live feed
                        </span>
                      </li>
                      <li className={'active'}>
                        <NavLink to={`${path}`}>
                          Sources
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                </div>
                {/* <div className="project-sort-search">
                  <AutoComplete onSearch={handleSearch} dataSource={notData} placeholder="Search projects" patterns />
                </div> */}
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
                  <PageHeader
                    title="Newsfeed sources"
                    buttons={[
                      <Button onClick={showModal} key="1" type="primary" size="default">
                        <FeatherIcon icon="plus" size={16} /> Add source
                      </Button>,
                    ]}
                  />
                  <SourcesTable />
                </Suspense>
              </Switch>
            </div>
          </Col>
        </Row>
      </Main>
      <AddSource onCancel={onCancel} visible={visible} canChooseProject={false}/>
    </>
  );
};

MainFeedSources.propTypes = {
  match: propTypes.object,
};

export default MainFeedSources;
