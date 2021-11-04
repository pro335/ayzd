import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import FeedModal from "../../Components/Feeds/FeedModal";

const Guides = () => {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);    // show the guide modal

  const { project, guide } = useSelector(state => {
    return {
      project: state.project,
      guide: state.guide,
    };
  });

  const addDefaultSrc = (e) => {
    e.target.src = '/assets/images/default_image.svg';
  }

    
  const handleClick = async (item) => {

    let data = guide.guides.filter(function(x) {
      return item._id === x._id;
    });
    if(isValid(data) && isValid(data[0]) && isValid(data[0].unique_id) && isValid(data[0].project) && isValid(data[0].project.unique_id) ) {
      setOpen(true);
      // setIsClickedGuide(true);

      let project_unique_id = data[0].project.unique_id;
      let guide_unique_id = data[0].unique_id;
      
      let guide_data = await actions.getGuideFromUniqueId({ project_unique_id, guide_unique_id });

      if(isValid(guide_data) && isValid(guide_data.data.data)) {
        let temp_item = guide_data.data.data;
        dispatch({
          type: ActionTypes.SET_GUIDE,
          data: temp_item,
        });
        // setIsClickedGuide(false);
      }      
    }
  }

  let imageUrl = null;
  return (
    <>
      <div className="h-full overflow-y-scroll p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-x-5 lg:gap-y-7 mt-6">
        {
          project.projectData.guide_list.map((item, index) => {
            imageUrl = isValid(item.media_image) && isValid(item.media_image.url) ? item.media_image.url : `${config.bucket_url}/${config.common_image}`;
            return (
              <div className="hover:cursor-pointer" onClick={() => handleClick(item)}>
                <div className="bg-brand-gray-800 border border-brand-gray-800 rounded-xl overflow-hidden">
                  <div
                    className="block h-41 xl:h-52 relative"
                  >
                    <img className="w-full h-full object-cover" src={imageUrl} alt="" onError={addDefaultSrc} />
                    <img className={`${item.is_video_guide ? "visible": "invisible"} absolute inset-y-0 top-0 ml-2 mt-2`} src="/assets/icons/video.svg" alt="" />
                  </div>
                  <div className="text-xs font-medium pl-3 py-2 pr-5">
                    <>
                      <p className="capitalize">
                        {isValid(project.projectData) ? project.projectData.name : ""}
                      </p>
                      <p className="text-sm text-gray-300">
                        {item.title}
                      </p>
                    </>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div >
      <FeedModal open={open} setOpen={setOpen} type={"guides"} is_move_page={false} />
    </>
  ) 
}

export default Guides;
