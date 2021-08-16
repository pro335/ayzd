import React from 'react'
import CheckBoxesList from "./CheckboxesList"
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';

const NFTSidebar = ({ projects, handleChange, all }) => {

  const { category, chain } = useSelector(state => {
    return {
      category: state.category,
      chain: state.chain,
    };
  });

  return (
    <>
      <CheckBoxesList
        data={category.categories}
        handleChange={handleChange}
        all={all}
        title="Categories"
        icon="categories"
      />
      <CheckBoxesList
        data={chain.chains}
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
