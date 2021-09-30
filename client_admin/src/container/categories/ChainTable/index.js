import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Table, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper, TableWrapper } from './styled';
import { Button } from '../../../components/buttons/buttons';
import * as actions from '../../../redux/actions';
import * as ActionTypes from '../../../redux/ActionTypes';
import AddChain from '../overview/AddChain';
import isValid from '../../../utility/isValid';

const ChainTable = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
    visibleChainModal: false,
    allChains: [],
    chainData: null,
  });

  const { project, chains } = useSelector(state => {
    return {
      project: state.project,
      chains: state.chain.chains,
    };
  });

  useEffect( () => {
    const makeTableData = async () => {
      try {
        let countArr = new Array(chains.length).fill(0);
        for(let i = 0 ; i < project.projects.length ; i ++) {
          let foundIndex = -1;
          if(isValid(project.projects[i].chain))
            foundIndex = chains.findIndex(x => x._id === project.projects[i].chain._id);
          if(foundIndex !== -1) {
            let tempCount = countArr[foundIndex];
            tempCount ++;
            countArr[foundIndex] = tempCount;
          }
        }

        let tempData = [];
        for( let i = 0 ; i < chains.length; i ++ ) {
          tempData.push({
            key: chains[i]._id,
            name: chains[i].name,
            project_count: countArr[i]
          })
        }
        setState({ ...state, allChains: tempData });
      } catch (err) {
        console.log(err);
      }
    }
    makeTableData();
  }, [project.projects, chains]);

  const { visibleChainModal } = state;

  const columnsSort = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: name => (
        <span className="source">{ name }</span>
      )
    },
    {
      title: 'Project Count',
      dataIndex: 'project_count',
      render: project_count => (
        <span className="source">{ project_count }</span>
      )
    },
    {
      title: '',
      dataIndex: 'key',
      render: key => (
        <div className="table-actions">
          <Button className="btn-icon" type="info" onClick={() => updateChain(key)} shape="circle">
            <FeatherIcon icon="edit" size={16} />
          </Button>
          <Button className="btn-icon" type="danger" onClick={() => deleteChain(key)} shape="circle">
            <FeatherIcon icon="trash-2" size={16} />
          </Button>
        </div>
      )
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    setState({ ...state, values: { pagination, filters, sorter, extra } });
  }

  const onChainCancel = () => {
    setState({
      ...state,
      visibleChainModal: false,
    });
  }

  const updateChain = (_id) => {
    let tempChainData = null;
    for(let i = 0 ; i < chains.length ; i ++)
      if(chains[i]._id === _id) {
        tempChainData = chains[i];
        break;
      }

      setState({ ...state, chainData: tempChainData, visibleChainModal: true });
  }

  const deleteChain = (_id) => {
    actions.deleteChain(_id).then( res => {
      const { success, chain } = res.data;
      if(success) {
        dispatch({
            type: ActionTypes.DELETE_CHAIN,
            data: chain
        });

        notification['success'] ({
          message: 'A chain was removed successfully',
          description: ''
        })              
      } else {
        dispatch({
            type: ActionTypes.CHAIN_ERR,
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
                    position: ['none', 'bottomLeft'],
                    defaultPageSize: 20,
                    showSizeChanger: true,
                    pageSizeOptions: [10, 20, 50, 100]
                  }}
                  columns={columnsSort}
                  dataSource={state.allChains}
                  onChange={onChange}
                />
              </TableWrapper>
            </UserTableStyleWrapper>
          </Cards>
          {
          visibleChainModal ?
            <AddChain onCancel={onChainCancel} visible={visibleChainModal} chainAction={1} chainData={state.chainData} />
            :
            null 
          }
        </Col>
      </Row>
    </>
  );
};

export default ChainTable;
