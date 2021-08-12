import React from 'react'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';

const Guides = () => {

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  let imageUrl = null;
  return (
    <div className="h-full overflow-y-scroll p-4 sm:p-5">
      <div className="grid md:grid-cols-2 gap-6">
        {
          project.projectData.guide_list.map((item, index) => {
            imageUrl = isValid(item.media) ? item.media.url : `${config.bucket_url}/${config.common_image}`;
            return (
              <div key={index} className="block w-full bg-brand-gray-800 rounded-lg overflow-hidden">
                <div className="h-40">
                  <img className="w-full h-full object-cover" src={imageUrl} alt="" />
                </div>
                <div className="p-2">
                  <p className="text-xs leading-4">
                    {item.title}
                  </p>
                  <h4 className="text-sm text-brand-gray-300 font-medium" dangerouslySetInnerHTML={{__html: item.full_description}} />
                </div>
              </div>
            )
          })
        }
      </div>
    </div >
  )
}

export default Guides
