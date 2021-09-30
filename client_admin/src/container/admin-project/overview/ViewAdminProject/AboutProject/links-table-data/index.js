import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Table } from 'antd';
import { Cards } from '../../../../../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper, TableWrapper } from './styled';
import reduceTextLengh from '../../../../../../utility/reduceTextLengh';

const LinksTableData = () => {
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
      title: 'Link',
      dataIndex: 'app_link',
      render: app_link => (
        <span className="source"><a href={app_link} target="_blank">{ reduceTextLengh(app_link, 16) }</a></span>
      )
    },
    {
      title: 'Twitter',
      dataIndex: 'twitter_link',
      render: twitter_link => (
        <span className="source"><a href={twitter_link} target="_blank">{ reduceTextLengh(twitter_link, 16) }</a></span>
      )
    },
    {
      title: 'Telegram',
      dataIndex: 'telegram_link',
      render: telegram_link => (
        <span className="source"><a href={telegram_link} target="_blank">{ reduceTextLengh(telegram_link, 16) }</a></span>
      )
    },
    {
      title: 'Discord',
      dataIndex: 'discord_link',
      render: discord_link => (
        <span className="source"><a href={discord_link} target="_blank">{ reduceTextLengh(discord_link, 16) }</a></span>
      )
    },
  ];

  const dataSort = [
    {
      key: '1',
      app_link: project.projectData.app_link,
      twitter_link: project.projectData.twitter_link,
      telegram_link: project.projectData.telegram_link,
      discord_link: project.projectData.discord_link,
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

export default LinksTableData;
