import React from 'react';
import { Route, Switch } from "react-router-dom";
import Sidebar from "../Components/Projects/Sidebar";
import SmartFeed from "../Components/Dashboard/SmartFeed";
import { Helmet } from 'react-helmet'

const Dashboard = () => {

  return (
    <>
      <Helmet>
        <title>{ "NFT Dashboard on ayzd.com: live NFT news, biggest NFT sales, NFT tokens, drops and more" }</title>
      </Helmet>
      <div className="h-full w-full grid lg:grid-cols-6 lg:overflow-hidden">
        <Sidebar />
        <Switch>
          <Route exact path="/" component={SmartFeed} />
        </Switch>
      </div>

    </>
  )
}

export default Dashboard
