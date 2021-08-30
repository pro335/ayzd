import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import SectionHeading from "./../SectionHeading";
import MediaList from "./Media";
import NFTSliders from "./NFT-Sliders";
import Team from "./Team";
import isValid from '../../utility/isValid';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import CommunityActivityComponent from './CommunityActivityComponent';

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
          </div>

          <div className="min-w-[320px] w-full">
            {isValid(project.projectData) && isValid(project.projectData.member_list) ?
              <div className="border-r border-b border-brand-gray-800">
                <div>
                  <SectionHeading
                    title="Community activity"
                    icon="community_activity"
                    classes="border-t"
                  />
                  <div className="w-full lg:w-auto lg:flex items-center justify-center lg:justify-start pl-3">
                    <CommunityActivityComponent icon="twitter_community" title="Twitter" amount={"34,991"} />
                    <CommunityActivityComponent icon="discord_community" title="Discord" amount={"34,991"} />
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
            {/* <NFTSliders
              title="Top sales of the day"
              icon="shopping-cart"
              classes="border-t"
              type="top-sales"
            /> */}

            {isValid(project.projectData) && isValid(project.projectData.member_list) ?
              <div className="border-r border-brand-gray-800">
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
        </div>
        :
        null
      }
    </>
  )
}

export default About
