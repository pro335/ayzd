import React from 'react'
import SectionHeading from "./../SectionHeading";
import MediaList from "./Media";
import NFTSliders from "./NFT-Sliders";
import Team from "./Team";

const About = () => {
  return (
    <div className="min-w-[320px] w-full h-full grid lg:grid-cols-2 overflow-y-scroll">
      <div className="min-w-[320px] border-r border-brand-gray-800">
        <SectionHeading
          title="Project description"
          icon="project-description"
        />

        <div className="text-sm text-brand-gray-400 font-medium p-4 sm:p-5 space-y-3">
          <p>
            Decentraland is a virtual reality platform powered by the Ethereum blockchain. Users can create, experience, and monetize content and applications. Land in Decentraland is permanently owned by the community, giving them full control over their creations. Users claim ownership of virtual land on a blockchain-based ledger of parcels. Landowners control what content is published to their portion of land, which is identified by a set of cartesian coordinates(x,y). Contents can range from static 3D scenes to interactive systems such as games.
          </p>
          <p>
            Land is a non-fungible, transferrable, scarce digital asset stored in an Ethereum smartcontract. It can be acquired by spending an ERC20 token called MANA. MANA can also be used to make in-world purchases of digital goods and services. People are spending increasingly more time in virtual worlds, for both leisure and work. This occurs predominantly in 2D interfaces such as the web and mobile phones. But a traversable 3D world adds an immersive component as well as adjacency to other content, enabling physical clusters of communities. Unlike other virtual worlds and social networks, Decentraland is not controlled by a centralized organization. There is no single agent with the power to modify the rules of the software, contents of land, economics of the currency, or prevent others from accessing the world.
          </p>
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
