import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Table, Avatar } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper, TableWrapper } from './styled';
import { Button } from '../../../../../components/buttons/buttons';
import Heading from '../../../../../components/heading/heading';
import { PageHeader } from '../../../../../components/page-headers/page-headers';
import isValid from '../../../../../utility/isValid';
import AddMediaTableData from '../add-media-table-data';
import config from '../../../../../config/config';

const MainImageTableData = ({mediaCategory = 0}) => {


  /**
   * Description about the parameter
   * 
   * mediaCategory: 0: main image, 2: secondary image, 3: video guide, 4: image guide, default: 0,
   * 
   */


  const { project, guide } = useSelector(state => {
    return {
      project: state.project,
      guide: state.guide,
    };
  });

  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
    visible: false,
    media: [],
  });

  const { visible } = state;

  const columnsSort = [
    {
      title: 'Source',
      dataIndex: 'media_data',
      render: media_data => (
        <div className="user-info">
          <figure>
            <Avatar size={40} src={media_data.url} />
          </figure>
          <figcaption>
            <Heading className="user-name" as="h6">
              {media_data.name}
            </Heading>
          </figcaption>
        </div>
      )
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      render: () => (
        <div className="table-actions">
          <Button className="btn-icon" type="info" to="#" shape="circle" onClick={showModal}>
            <FeatherIcon icon="edit" size={16} />
          </Button>
        </div>
      )
    },
  ];

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      let temp_media = [];
      if(mediaCategory === 0 && isValid(project.projectData.main_image)) {
        temp_media = [{
            key: '1',
            media_data: {
              url: project.projectData.main_image.url,
              name: project.projectData.main_image.name,
            },
          }];
        setState({
          media: temp_media
        });
      } else if(mediaCategory === 2 && isValid(project.projectData.secondary_image)) {
        temp_media = [{
            key: '1',
            media_data: {
              url: project.projectData.secondary_image.url,
              name: project.projectData.secondary_image.name,
            },
          }];
        setState({
          media: temp_media
        });
      } else if(mediaCategory === 3 && isValid(guide) && isValid(guide.guideData) && isValid(guide.guideData.media_video)) {
        temp_media = [{
            key: '1',
            media_data: {
              url: `${config.bucket_url}/${config.video_mark_image}`,
              name: guide.guideData.media_video.name,
            },
          }];
        setState({
          media: temp_media
        });
      } else if(mediaCategory === 4 && isValid(guide) && isValid(guide.guideData) && isValid(guide.guideData.media_image)) {
        temp_media = [{
            key: '1',
            media_data: {
              url: guide.guideData.media_image.url,
              name: guide.guideData.media_image.name,
            },
          }];
        setState({
          media: temp_media
        });
      }
    }
    return () => {
      unmounted = true;
    };
  }, [project.projectData.main_image, project.projectData.secondary_image, guide.guideData]);

  function onChange(pagination, filters, sorter, extra) {
    setState({ ...state, values: { pagination, filters, sorter, extra } });
  }

  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
    // window.open(project.projectData.main_image.url, "_blank");
  };

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
    });
  };

  const title = 
    mediaCategory === 0 ? "Main image"
    : mediaCategory === 2 ? "Secondary image"
      : mediaCategory === 3 ? "Video guide"
        : mediaCategory === 4 ? "Preview image"
          : "Upload file";

  return (
    <>
      <Row>
        <PageHeader
          title={title}
        />
        <Col xs={24}>
          <Cards title="" headless>
            <UserTableStyleWrapper>
              <TableWrapper className="table-responsive">
                {isValid(state.media) ?
                  <Table
                    className="table-responsive"
                    pagination={ false }
                    columns={columnsSort}
                    dataSource={state.media}
                    onChange={onChange}
                  />
                  :
                  null
                }
              </TableWrapper>
            </UserTableStyleWrapper>
          </Cards>
        </Col>
      </Row>
      {
        visible ?
          <AddMediaTableData onCancel={onCancel} visible={visible} mediaCategory={mediaCategory} mediaAction={1} />
          :
          null 
      }
    </>
  );
};

export default MainImageTableData;
