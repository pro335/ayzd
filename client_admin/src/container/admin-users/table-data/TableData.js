import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Table, Avatar, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper, TableWrapper } from './styled';
import { Button } from '../../../components/buttons/buttons';
import Heading from '../../../components/heading/heading';
import AddAdminUser from '../overview/AddAdminUser';
import * as actions from '../../../redux/actions';
import * as ActionTypes from '../../../redux/ActionTypes';
import config from '../../../config/config';

const TableData = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
    visibleUserModal: false,
    allUsers: [],
    userData: null,
  });

  const { users, authUser } = useSelector(state => {
    return {
      users: state.user.users,
      authUser: state.auth.user,
    };
  });

  useEffect( () => {
    const makeTableData = async () => {
      try {
        let tempData = [];
        for( let i = 0 ; i < users.length; i ++ ) {
          tempData.push({
            key: users[i]._id,
            person: {
              avatar: users[i].avatar,
              name: users[i].name
            },
            email: users[i].email,
            status: users[i].role === 0 ? "Super-admin": "Editor",
          })
        }
        setState({ ...state, allUsers: tempData });
      } catch (err) {
        console.log(err);
      }
    }
    makeTableData();
  }, [users]);

  const { visibleUserModal } = state;

  const columnsSort = [
    {
      title: 'User',
      dataIndex: 'person',
      render: person => (
        <div className="user-info">
          <figure>
            <Avatar 
              size={40}
              src={person.avatar !== null && person.avatar !== undefined && person.avatar.name !== undefined && person.avatar.name !== null ?
                `${config.bucket_url}/${person.avatar.name}` :
                `${config.bucket_url}/${config.general_avatar}`
              }
              alt="User Avatar" 
            />
          </figure>
          <figcaption>
            <Heading className="user-name" as="h6">
              {person.name}
            </Heading>
          </figcaption>
        </div>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: email => (
        <span className="source">{ email }</span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: status => (
        <span className={`status-text ${status}`}>{ status }</span>
      )
    },
    {
      title: 'Actions',
      dataIndex: 'key',
      render: (key) => (
        <div className="table-actions">
          <Button className="btn-icon" type="info" onClick={() => updateUser(key)} shape="circle">
            <FeatherIcon icon="edit" size={16} />
          </Button>
          <Button className="btn-icon" type="danger" onClick={() => deleteUser(key)} shape="circle">
            <FeatherIcon icon="trash-2" size={16} />
          </Button>
        </div>
      )
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    setState({ ...state, values: { pagination, filters, sorter, extra } });
  }

  const onUserCancel = () => {
    setState({
      ...state,
      visibleUserModal: false,
    });
  }

  const updateUser = (_id) => {
    let tempUserData = null;
    for(let i = 0 ; i < users.length ; i ++)
      if(users[i]._id === _id) {
        tempUserData = users[i];
        break;
      }

      setState({ ...state, userData: tempUserData, visibleUserModal: true });
  }

  const deleteUser = (_id) => {

    // If current user
    if(authUser._id === _id) {
      notification['error'] ({
        message: 'You can\'t remove your user info!',
        description: ''
      });
      return;
    }

    actions.deleteUser(_id).then( res => {
      const { success, user } = res.data;
      if(success) {
        dispatch({
            type: ActionTypes.DELETE_USER,
            data: user
        });

        notification['success'] ({
          message: 'A user was removed successfully',
          description: ''
        })              
      } else {
        dispatch({
            type: ActionTypes.USER_ERR,
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
      <Row>
        <Col xs={24}>
          <Cards title="" headless>
            <UserTableStyleWrapper>
              <TableWrapper className="table-responsive">
                <Table
                  className="table-responsive"
                  pagination={{
                    defaultPageSize: 20,
                    showSizeChanger: true,
                    pageSizeOptions: [10, 20, 50, 100]
                  }}
                  columns={columnsSort}
                  dataSource={state.allUsers}
                  onChange={onChange}
                />
              </TableWrapper>
            </UserTableStyleWrapper>
          </Cards>
        </Col>
      </Row>
      {
        visibleUserModal ?
          <AddAdminUser onCancel={onUserCancel} visible={visibleUserModal} userAction={1} userData={state.userData} />
          :
          null 
        }
    </>
  );
};

export default TableData;
