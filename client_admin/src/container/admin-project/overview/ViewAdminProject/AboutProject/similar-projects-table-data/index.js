import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Table } from 'antd';
import { Cards } from '../../../../../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper, TableWrapper } from './styled';
import isValid from '../../../../../../utility/isValid';

const SimilarProjectsTableData = () => {
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
      title: 'Similar projects',
      dataIndex: 'similar_projects',
      render: similar_projects => (
        <span className="source">{ similar_projects }</span>
      )
    },
  ];

  const dataSort = [
    {
      key: '1',
      similar_projects: isValid(project.projectData.similar_list) ? project.projectData.similar_list.map(item => {return item.name}).join(", ") : "",
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

export default SimilarProjectsTableData;
