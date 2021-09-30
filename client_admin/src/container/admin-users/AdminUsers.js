import React, { useState, useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Switch } from 'react-router-dom';
import propTypes from 'prop-types';
import { ProjectHeader } from './style';
import { Main } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import TableData from './table-data/TableData';
import { Button } from '../../components/buttons/buttons';
import AddAdminUser from './overview/AddAdminUser';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';

const AdminUsers = ({ match }) => {
  
  const { searchData, userList } = useSelector(state => {
    return {
      searchData: state.headerSearchData,
      userList: state.user.users,
    };
  });

  const [state, setState] = useState({
    notData: searchData,
    visible: false,
  });

  const { visible } = state;

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
          title="Admin Users"
          subTitle={<>{userList.length} User(s)</>}
          buttons={[
            <Button onClick={showModal} key="1" type="primary" size="default">
              <FeatherIcon icon="plus" size={16} /> Add New User
            </Button>,
          ]}
        />
      </ProjectHeader>
      <Main>
        <Row gutter={25}>
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
                  <TableData />
                </Suspense>
              </Switch>
            </div>
          </Col>
        </Row>
        {
          visible ?
            <AddAdminUser onCancel={onCancel} visible={visible} userAction={0} userData={null} />
            :
            null 
        }
      </Main>
    </>
  );
};

AdminUsers.propTypes = {
  match: propTypes.object,
};

export default AdminUsers;
