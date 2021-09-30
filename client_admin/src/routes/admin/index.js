import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import withAdminLayout from '../../layout/withAdminLayout';

const Projects = lazy(() => import('./projects'));

const MainFeed = lazy(() => import('../../container/main-feed/MainFeed'));
const MainFeedSources = lazy(() => import('../../container/main-feed-sources/MainFeedSources'));
const Categories = lazy(() => import('../../container/categories/Categories'));
const AdminUsers = lazy(() => import('../../container/admin-users/AdminUsers'));

const Admin = () => {
  const { path } = useRouteMatch();

  const { user } = useSelector(state => {
    return {
      user: state.auth.user,
    };
  });

  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route exact path={`${path}`} component={MainFeed} />
        <Route path={`${path}/sources`} component={MainFeedSources} />
        <Route exact path={`${path}/categories`} component={Categories} />
        <Route exact path={`${path}/admin-users`} component={AdminUsers} />
        <Route path={`${path}/admin-project`} component={Projects} />
        {window.location.href.includes("admin-users") && user.role !== 0 && (
          <Redirect to="/admin" />
        )}
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Admin);
