import React from 'react'
import CheckBoxesList from "./CheckboxesList"
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';

const NFTSidebar = ({ handleChange, all }) => {

  const { category, chain } = useSelector(state => {
    return {
      category: state.category,
      chain: state.chain,
    };
  });

  return (
    <>
      <CheckBoxesList
        data={category.category_checked_list}
        handleChange={handleChange}
        all={all}
        title="Categories"
        icon="categories"
      />
      <CheckBoxesList
        data={chain.chain_checked_list}
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
