import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

SwiperCore.use([]);

const MediaList = () => {

  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
    
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  var image = null;
  var url = null;

  return (
    <>
      <Swiper
        className="max-w-full"
        slidesPerView={1.25}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2.5
          },
          768: {
            slidesPerView: 3.5
          },
          1280: {
            slidesPerView: 3
          }
        }}
      >
        {
          project.projectData.media_list.map((media, index) => (
            image = isValid(media.url) && media.type === 0 ? media.url : `${config.bucket_url}/${config.common_image}`,
            url = isValid(media.url) ? [media.url] : [`https://www.google.com`],

            <SwiperSlide key={index} className="pl-4">
              <div className="block lg:flex-shrink-0 bg-brand-gray-800 rounded-lg overflow-hidden hover:cursor-pointer onHover" onClick={() => {setIsOpen(true); setPhotoIndex(index);}}>
                <div className="w-full">
                  <img className="w-full" src={image} alt="" />
                </div>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
      {isOpen && (
        <Lightbox
          mainSrc={isValid(project.projectData.media_list[photoIndex].url) && project.projectData.media_list[photoIndex].type === 0 ? project.projectData.media_list[photoIndex].url : `${config.bucket_url}/${config.common_image}`}
          // nextSrc={image[(photoIndex + 1) % image.length]}
          // prevSrc={image[(photoIndex + image.length - 1) % image.length]}
          onCloseRequest={() => setIsOpen(false)}
          // onMovePrevRequest={() =>
          //   setPhotoIndex( (photoIndex + image.length - 1) % image.length )
          // }
          // onMoveNextRequest={() =>
          //   setPhotoIndex( (photoIndex + 1) % image.length )
          // }
        />
      )}      
    </>
  )
}

export default MediaList
