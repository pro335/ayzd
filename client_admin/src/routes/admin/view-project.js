import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const ViewAdminProject = lazy(() => import('../../container/admin-project/overview/ViewAdminProject'));
const AddAdminProject = lazy(() => import('../../container/admin-project/overview/AddAdminProject'));
const AddAdminProjectFromUrl = lazy(() => import('../../container/admin-project/overview/AddAdminProjectFromUrl'));
const AddGuide = lazy(() => import('../../container/admin-project/overview/ViewAdminProject/guides-table-data/AddGuide'));

const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={ViewAdminProject} />
      <Route path={`${path}/add`} component={AddAdminProject} />
      <Route path={`${path}/add-from-url`} component={AddAdminProjectFromUrl} />
      <Route path={`${path}/add-guide`} component={AddGuide} />
    </Switch>
  );
};

export default ProjectRoutes;
