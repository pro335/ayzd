import React, { useState, useEffect } from 'react'
import SectionHeading from "./../SectionHeading";
import MetaverseProjectsList from "./MetaverseProjectsList";
import LottieAnimation from '../Lottie/Lottie';
import LOTTIE_DATA from '../Lottie/data.json';
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';

const MetaverseProjectsSection = () => {

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });
  const [metaverseProjectsList, setMetaverseProjectsList] = useState([]);


  useEffect(() => {
    let tempProjects = project.projects.filter(item => isValid(item.category) && item.category.name === "Metaverse");
    setMetaverseProjectsList(tempProjects);
    return () => {
    }
  }, [isValid(project.projects)]);

  return (
    <>
      <div>
        <SectionHeading
          title="Metaverse projects"
          icon="metaversefeed"
          classes="border-t"
          buttons="All projects"
          btnLink="/nft-projects"
        />
        {!isValid(metaverseProjectsList) ?
          <div className="h-full flex flex-col justify-center items-center py-20">
            <LottieAnimation lotti={LOTTIE_DATA} height={50} width={50} />
          </div>
          :
          <div className="py-5">
            <MetaverseProjectsList data={metaverseProjectsList.slice(0, 4)} />
          </div>
        }
      </div>
    </>
  )
}

export default MetaverseProjectsSection
