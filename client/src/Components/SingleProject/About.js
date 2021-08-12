import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import SectionHeading from "./../SectionHeading";
import MediaList from "./Media";
import NFTSliders from "./NFT-Sliders";
import Team from "./Team";

const About = () => {
    
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  return (
    <div className="min-w-[320px] w-full h-full grid lg:grid-cols-2 overflow-y-scroll">
      <div className="min-w-[320px] border-r border-brand-gray-800">
        <SectionHeading
          title="Project description"
          icon="project-description"
        />

        <div className="text-sm text-brand-gray-400 font-medium p-4 sm:p-5 space-y-3">
          <p dangerouslySetInnerHTML={{__html: project.projectData.full_description}} />
        </div>

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
        <NFTSliders
          title="Trending nfts"
          icon="trending-nft"
        />
        <NFTSliders
          title="Top sales of the day"
          icon="shopping-cart"
          classes="border-t"
        />
      </div>

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
    </div>
  )
}

export default About
