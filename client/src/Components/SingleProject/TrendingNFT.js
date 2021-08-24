import React, { useEffect } from 'react'
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Card from "../Card";
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';

SwiperCore.use([]);

const TrendingNFT = () => {
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
  }, [])

  return (
    <>
      {isValid(project) && isValid(project.trendingNFTs) ?
        <Swiper
          slidesPerView={1.75}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 3.5
            },
            768: {
              slidesPerView: 4.5
            },
            1024: {
              slidesPerView: 3.75
            }
          }}
        >
          {
            project.trendingNFTs.map((item, index) => (
              <SwiperSlide key={index} className="pl-4">
                <Card item={item}/>
              </SwiperSlide>
            ))
          }
        </Swiper>
        :
        null
      }
    </>
  )
}

export default TrendingNFT
