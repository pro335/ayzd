import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Table } from 'antd';
import { Cards } from '../../../../../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper, TableWrapper } from './styled';
import isValid from '../../../../../../utility/isValid';

const CategoryChainTableData = () => {
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });


  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
  });

  const columnsSort = [
    {
      title: 'Category',
      dataIndex: 'category',
      render: category => (
        <span className="source">{ category }</span>
      )
    },
    {
      title: 'Chain',
      dataIndex: 'chain',
      render: chain => (
        <span className="source">{ chain }</span>
      )
    },
  ];

  const dataSort = [
    {
      key: '1',
      category: isValid(project.projectData.category) ? project.projectData.category.name : "",
      chain: isValid(project.projectData.chain) ? project.projectData.chain.name : "",
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    setState({ ...state, values: { pagination, filters, sorter, extra } });
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
                  pagination={ false }
                  columns={columnsSort}
                  dataSource={dataSort}
                  onChange={onChange}
                  size={"small"}
                />
              </TableWrapper>
            </UserTableStyleWrapper>
          </Cards>
        </Col>
      </Row>
    </>
  );
};

export default CategoryChainTableData;
