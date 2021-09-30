import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form } from 'antd';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../../../styled';
import Heading from '../../../../../components/heading/heading';
import { TextWrapper } from './style'
import LinksTableData from './links-table-data';
import SimilarProjectsTableData from './similar-projects-table-data';
import CategoryChainTableData from './category-chain-table-data';
import isValid from '../../../../../utility/isValid';
import moment from 'moment';

const AboutProject = () => {
  const dispatch = useDispatch();
  
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const [score_team, setScore_team] = useState( isValid(project.projectData) && isValid(project.projectData.score_team) ? Number(project.projectData.score_team) : 0 );
  const [score_uniqueness, setScore_uniqueness] = useState( isValid(project.projectData) && isValid(project.projectData.score_uniqueness) ? Number(project.projectData.score_uniqueness) : 0 );
  const [score_community, setScore_community] = useState( isValid(project.projectData) && isValid(project.projectData.score_community) ? Number(project.projectData.score_community) : 0 );
  const [score_v_quality, setScore_v_quality] = useState( isValid(project.projectData) && isValid(project.projectData.score_v_quality) ? Number(project.projectData.score_v_quality) : 0 );
  const [score_v_potential, setScore_v_potential] = useState( isValid(project.projectData) && isValid(project.projectData.score_v_potential) ? Number(project.projectData.score_v_potential) : 0 );
  const [score_utility, setScore_utility] = useState( isValid(project.projectData) && isValid(project.projectData.score_utility) ? Number(project.projectData.score_utility) : 0 );

  return (
    <Cards
      title={
        <div className="setting-card-title">
          <Heading as="h4">About Project</Heading>
        </div>
      }
    >
      <Row justify="center">
        <Col xs={24}>
          <BasicFormWrapper>
            <Form name="aboutProject">
              <Form.Item name="small_description" label="Small description">
                <TextWrapper>
                  <p className="text-wrapper">{project.projectData.small_description}</p>
                </TextWrapper>
              </Form.Item>
              <Form.Item name="full_description" label="Full description">
                <TextWrapper>
                  <p className="text-wrapper" dangerouslySetInnerHTML={{__html: project.projectData.full_description}}></p>
                </TextWrapper>
              </Form.Item>
              <Form.Item name="links_table_data" label="">
                <LinksTableData />
              </Form.Item>
              <Form.Item name="similar_projects_table_data" label="">
                <SimilarProjectsTableData />
              </Form.Item>
              <Form.Item name="category_chain_table_data" label="">
                <CategoryChainTableData />
              </Form.Item>
              {isValid(project.projectData.isUpcoming) && project.projectData.isUpcoming ? 
                <>
                  <Form.Item name="status" label="Upcoming Status">
                    <TextWrapper>
                      <p className="text-wrapper">{project.projectData.isUpcoming ? "Yes" : "No"}</p>
                    </TextWrapper>
                  </Form.Item>
                  <Form.Item name="price" label="Price">
                    <TextWrapper>
                      <p className="text-wrapper">{project.projectData.price}</p>
                    </TextWrapper>
                  </Form.Item>
                  <Form.Item name="upcoming_date" label="Upcoming Date and Time">
                    <TextWrapper>
                      <p className="text-wrapper">{moment(project.projectData.upcoming_date).format("MMM D, YYYY hh:mm A")}</p>
                    </TextWrapper>
                  </Form.Item>
                  <Form.Item name="mint_size" label="Mint Size">
                    <TextWrapper>
                      <p className="text-wrapper">{project.projectData.mint_size}</p>
                    </TextWrapper>
                  </Form.Item>
                </>
                :
                null
              }
              { ( isValid(project.projectData) && ( score_team > 0 || score_uniqueness > 0 || score_community > 0 || score_v_quality > 0 || score_v_potential > 0 || score_utility > 0 ) ) ?
                <>
                  <Heading as="h6">Project Score</Heading>
                  <Form.Item name="score_utility" label="Utility">
                    <TextWrapper>
                      <p className="text-wrapper">{score_utility}</p>
                    </TextWrapper>
                  </Form.Item>
                  <Form.Item name="score_uniqueness" label="Uniqueness">
                    <TextWrapper>
                      <p className="text-wrapper">{score_uniqueness}</p>
                    </TextWrapper>
                  </Form.Item>
                  <Form.Item name="score_community" label="Community">
                    <TextWrapper>
                      <p className="text-wrapper">{score_community}</p>
                    </TextWrapper>
                  </Form.Item>
                  <Form.Item name="score_team" label="Team">
                    <TextWrapper>
                      <p className="text-wrapper">{score_team}</p>
                    </TextWrapper>
                  </Form.Item>
                  <Form.Item name="score_v_potential" label="Viral Potential">
                    <TextWrapper>
                      <p className="text-wrapper">{score_v_potential}</p>
                    </TextWrapper>
                  </Form.Item>
                  <Form.Item name="score_v_quality" label="Visual quality">
                    <TextWrapper>
                      <p className="text-wrapper">{score_v_quality}</p>
                    </TextWrapper>
                  </Form.Item>
                </>
                :
                null
              }
            </Form>
          </BasicFormWrapper>
        </Col>
      </Row>
    </Cards>
  );
};

export default AboutProject;
