import React from 'react'
import { useSelector} from 'react-redux';
import SectionHeading from "../SectionHeading"
import FeedsList from "./FeedsList"
import Banner from "../NBA/Banner";
import data from '../../data.json'
import isValid from '../../utility/isValid';

const LiveFeedSection = ({ showDetailsPanel=false, onClickHandler }) => {

  const { project } = useSelector( state => {
    return {
      project: state.project
    };
  });

  return (
    <div className="h-full md:col-span-3 lg:overflow-hidden">

      {showDetailsPanel && isValid(project.project_id) && project.projectData.name !== "Smart feed" ?
        <Banner />
        :
        null
      }

      {/* <!-- Center Heading --> */}
      <SectionHeading
        title="Live news feed"
        icon="live-feed"
        buttons=""
        classes="lg:border-r"
      />
      {/* <!-- End --> */}


      <FeedsList feeds={data.livenews} onClickHandler={onClickHandler} />
    </div>
  )
}

export default LiveFeedSection
