import React from 'react'
import CheckBoxesList from "./CheckboxesList"


const NFTSidebar = ({ projects, handleChange, all }) => {

  return (
    <>
      <CheckBoxesList
        projects={projects.categories}
        handleChange={handleChange}
        all={all}
        title="Categories"
        icon="categories"
      />
      <CheckBoxesList
        projects={projects.chain}
        handleChange={handleChange}
        all={all}
        title="Chain"
        icon="link"
        classes="border-t"
      />
    </>
  )
}

export default NFTSidebar
