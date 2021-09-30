import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Input } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../../components/buttons/buttons';
import isValid from '../../../../../utility/isValid';
import { BasicFormWrapper } from '../../../../styled';
import { RowTwoComponents } from './style';
import Heading from '../../../../../components/heading/heading';
import * as ActionTypes from '../../../../../redux/ActionTypes';

const NewsfeedSources = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const [newsfeedSourceList, setNewsfeedSourceList] = useState([]);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      let tempNewsfeedSourceList = [];
      if(project.project_action === 2 && isValid(project.projectData.newsfeedSource_list)) {    // update project
        for( let i = 0 ; i < project.projectData.newsfeedSource_list.length ; i ++) {
          let item = {
            link: project.projectData.newsfeedSource_list[i].link,
            szKeyword: project.projectData.newsfeedSource_list[i].keyword_list.join(";"),
          }
          tempNewsfeedSourceList.push(item);
        }
        setNewsfeedSourceList(tempNewsfeedSourceList);
      }
      return () => {
        unmounted = true;
      };
    }
  }, []);

  const addMore = () => {
    let new_newsfeed_sources = [
      ...newsfeedSourceList,
      {
        link: "",
        szKeyword: "",
      },
    ];
    setNewsfeedSourceList(new_newsfeed_sources);

    let context_newsfeed_sources = isValid(project.projectData) && isValid(project.projectData.newsfeedSource_list) ? [...project.projectData.newsfeedSource_list] : [];

    context_newsfeed_sources = [
      ...context_newsfeed_sources,
      {
        link: "",
        keyword_list: [],
      }
    ];
    let newProject = {
      ...project.projectData,
      newsfeedSource_list: context_newsfeed_sources,
    };
    dispatch({
      type: ActionTypes.SET_PROJECT,
      data: newProject
    });
  }

  const onLinkChange = (e, index) => {

    // ------------ The start of calculating newsfeedSource list -----------
    let new_newsfeed_sources = newsfeedSourceList;
    let newValue = {
      ...newsfeedSourceList[index],
      link: e.target.value,
    };
    new_newsfeed_sources.splice(index, 1, newValue);

    setNewsfeedSourceList([...new_newsfeed_sources]);
    // ------------ The end of calculating newsfeedSource list -----------

    // ------------ The start of calculating project.projectData value -----------
    let tempNewsfeedSourceList = project.projectData.newsfeedSource_list;
    newValue = {
      ...tempNewsfeedSourceList[index],
      link: e.target.value,
    };
    tempNewsfeedSourceList.splice(index, 1, newValue);

    let newProject = {
      ...project.projectData,
      newsfeedSource_list: [...tempNewsfeedSourceList],
    };
    dispatch({
      type: ActionTypes.SET_PROJECT,
      data: newProject
    });

    // ------------ The end of calculating project.projectData value -----------
  }

  const onKeywordChange = (e, index) => {

    // ------------ The start of calculating newsfeedSource list -----------
    let new_newsfeed_sources = newsfeedSourceList;
    let newValue = {
      ...newsfeedSourceList[index],
      szKeyword: e.target.value,
    };
    new_newsfeed_sources.splice(index, 1, newValue);

    setNewsfeedSourceList([...new_newsfeed_sources]);
    // ------------ The end of calculating newsfeedSource list -----------

    // ------------ The start of calculating project.projectData value -----------
    // Get the list of the keywords 
    let keyword_list = isValid(e.target.value) ? e.target.value.split(";") : [];

    // filter(remove empty string) in the list of the keywords
    keyword_list = keyword_list.filter(function(item) {
      return isValid(item);
    });

    let tempNewsfeedSourceList = project.projectData.newsfeedSource_list;
    newValue = {
      ...tempNewsfeedSourceList[index],
      keyword_list: keyword_list,
    };
    tempNewsfeedSourceList.splice(index, 1, newValue);

    let newProject = {
      ...project.projectData,
      newsfeedSource_list: [...tempNewsfeedSourceList],
    };
    dispatch({
      type: ActionTypes.SET_PROJECT,
      data: newProject
    });
    // ------------ The end of calculating project.projectData value -----------
  }

  const removeNewsfeedSource = (index) => {

    let new_newsfeed_sources = newsfeedSourceList;
    new_newsfeed_sources.splice(index, 1);
    setNewsfeedSourceList([...new_newsfeed_sources]);

    let context_newsfeed_sources = project.projectData.newsfeedSource_list;
    context_newsfeed_sources.splice(index, 1);

    let newProject = {
      ...project.projectData,
      newsfeedSource_list: context_newsfeed_sources,
    };
    dispatch({
      type: ActionTypes.SET_PROJECT,
      data: newProject
    });
  }

  return (
    <Cards
      title={
        <div className="setting-card-title">
          <Heading as="h4">Newsfeed sources</Heading>
        </div>
      }
    >
      <Row justify="center">
        <Col xs={24}>
          <BasicFormWrapper>
            <Form name="newsfeedSources">
              <Form.Item name="rss_link" label="Rss link">
                { newsfeedSourceList.map((item, index) => (
                  <RowTwoComponents key={index}>
                    <div className="row-two-components">
                      <Input placeholder="Rss Link" value={newsfeedSourceList[index].link} onChange={(e) => onLinkChange(e, index)} />
                      <Input placeholder="Keywords" value={newsfeedSourceList[index].szKeyword} style={{ marginLeft: "10px" }} onChange={(e) => onKeywordChange(e, index)} />
                      <Button className="btn-icon" onClick={() => removeNewsfeedSource(index)}>
                        <FeatherIcon icon="trash-2" size={16} />
                      </Button>
                    </div>
                  </RowTwoComponents>
                ))}
              </Form.Item>
              <Form.Item>
                <Button onClick={addMore} key="1" type="primary" size="default">
                  Add more
                </Button>
              </Form.Item>
            </Form>
          </BasicFormWrapper>
        </Col>
      </Row>
    </Cards>
  );
};

export default NewsfeedSources;
