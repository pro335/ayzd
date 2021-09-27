import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import SectionHeading from "./../SectionHeading";
import MediaList from "./Media";
import NFTSliders from "./NFT-Sliders";
import Team from "./Team";
import Score from "./Score";
import isValid from '../../utility/isValid';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import CommunityActivityComponent from './CommunityActivityComponent';
import StatsTopComponent from './StatsTopComponent';
import moment from 'moment';

const About = () => {

  const dispatch = useDispatch();
    
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  useEffect(() => {
    
    async function fetchTrendingNFTs() {
      if(isValid(project.projectData) && isValid(project.projectData.slug)) {
        let params = {
          dappSlug: project.projectData.slug, 
          orderBy: null, 
          orderDirection: null,
        }

        let res = await actions.getTrendingNFTs(params);
        try {
          let { success, trendingNFTs } = res.data;
          if(success) {
            dispatch({
              type: ActionTypes.SET_TRENDING_NFTS,
              data: trendingNFTs
            });
          } else {
            dispatch({
              type: ActionTypes.PROJECT_ERR,
              err: res.data.errMessage
            });
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        dispatch({
          type: ActionTypes.SET_TRENDING_NFTS,
          data: []
        });
      }
    }

    fetchTrendingNFTs();
  }, []);

  return (
    <>
      {isValid(project.projectData) ?
        <div className="min-w-[320px] w-full h-full grid lg:grid-cols-2 overflow-y-scroll">
          <div className="min-w-[320px] border-r border-brand-gray-800">
            <SectionHeading
              title="Project description"
              icon="project-description"
            />

            <div className="text-sm text-brand-gray-400 font-medium p-4 sm:p-5 space-y-3" dangerouslySetInnerHTML={{__html: project.projectData.full_description}} />

            <div className="w-full">
              <SectionHeading
                title="Media"
                icon="media"
                classes="border-t"
              />

              <div className="p-4 sm:p-5">
                <MediaList />
              </div>
            </div>
            
            {isValid(project.projectData) && isValid(project.projectData.member_list) ?
              <div className="border-brand-gray-800 mb-1 lg:mb-8">
                <div>
                  <SectionHeading
                    title="Team behind project"
                    icon="team"
                    classes="border-t"
                  />
                  <Team />
                </div>
              </div>
              :
              null
            }
          </div>

          <div className="min-w-[320px] w-full">
            {isValid(project.projectDataNotDatabase) && (isValid(project.projectDataNotDatabase.discord_members) || isValid(project.projectDataNotDatabase.twitter_members) ) ?
              <div className="border-r border-b border-brand-gray-800">
                <div>
                  <SectionHeading
                    title="Stats"
                    icon="community_activity"
                    classes="border-t lg:border-t-0"
                  />
                  <div className="w-full lg:w-auto lg:flex lg:flex-col lg:justify-start pr-5">
                    <div className="w-full lg:w-auto lg:flex items-center justify-center lg:justify-start">
                      { isValid(project.projectData) && (!isValid(project.projectData.isUpcoming) || ( isValid(project.projectData.isUpcoming) && !project.projectData.isUpcoming )) && isValid(project.projectDataNotDatabase) && isValid(project.projectDataNotDatabase.volume) ?
                        <StatsTopComponent icon="sales_volume" title="Sales volume" amount={project.projectDataNotDatabase.volume} />
                        :
                        null
                      }
                      { isValid(project.projectData) && isValid(project.projectData.isUpcoming) && project.projectData.isUpcoming && isValid(project.projectData.upcoming_date) ?
                        <StatsTopComponent icon="calendar1" title="Drop date (GMT +3)" amount={moment(project.projectData.upcoming_date).format("MMM D, YYYY hh:mm A")} />
                        :
                        null
                      }
                    </div>
                    <div className="w-full lg:w-auto lg:flex items-center justify-center lg:justify-start mb-5">
                      {isValid(project.projectDataNotDatabase.twitter_members) ?
                        <CommunityActivityComponent icon="twitter_community" title="Twitter" amount={project.projectDataNotDatabase.twitter_members} url={project.projectData.twitter_link} />
                        :
                        null
                      }
                      {isValid(project.projectDataNotDatabase.discord_members) ?
                        <CommunityActivityComponent icon="discord_community" title="Discord" amount={project.projectDataNotDatabase.discord_members} url={project.projectData.discord_link} />
                        :
                        null
                      }
                    </div>
                  </div>
                </div>
              </div>
              :
              null
            }

            {isValid(project.projectData) && isValid(project.trendingNFTs) ?
              <NFTSliders
                title="Trending nfts"
                icon="trending-nft"
                type="trending-nft"
              />
              :
              null
            }
            { ( isValid(project.projectData) && ( (isValid(project.projectData.score_team) && Number(project.projectData.score_team) > 0 ) || (isValid(project.projectData.score_uniqueness) && Number(project.projectData.score_uniqueness) > 0) || (isValid(project.projectData.score_community) && Number(project.projectData.score_community) > 0) || (isValid(project.projectData.score_v_quality) && Number(project.projectData.score_v_quality) > 0) || (isValid(project.projectData.score_v_potential) && Number(project.projectData.score_v_potential) > 0) || (isValid(project.projectData.score_utility) && Number(project.projectData.score_utility) > 0) ) ) ?
              <div className="border-brand-gray-800 mb-1 lg:mb-8">
                <SectionHeading
                  title="Ayzd project score"
                  icon="score"
                  classes="border-t"
                />
                <Score />
              </div>
              :
              null
            }
          </div>
        </div>
        :
        null
      }
    </>
  )
}

export default About
