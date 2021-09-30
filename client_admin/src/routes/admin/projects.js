import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
const ViewProjects = lazy(() => import('./view-project'));

const AdminProject = lazy(() => import('../../container/admin-project/AdminProject'));

const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={AdminProject} />
      <Route path={`${path}/view`} component={ViewProjects} />
    </Switch>
  );
};

export default ProjectRoutes;
