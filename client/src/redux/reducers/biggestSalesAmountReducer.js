import * as ActionTypes from '../ActionTypes';
import isValid from '../../utility/isValid';

const initState = {
  biggestSalesAmount: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const BiggestSalesAmountReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case ActionTypes.BIGGEST_SALES_AMOUNT:
      let tempData = data;

      // if(isValid(tempData)) {
      //   for(let i = 0 ; i < tempData.length ; i ++) {
      //     for(let j = 0 ; j < i ; j ++) {
      //       if(parseInt(tempData[j]['amount'].replace(",", "")) - parseInt(tempData[i]['amount'].replace(",", "")) > 0) {
      //         let one_tempData = tempData[j];
      //         tempData[j] = tempData[i];
      //         tempData[i] = one_tempData;
      //       }
      //     }
      //   }
      // }

      console.log("tempData", tempData)
      return {
        ...state,
        biggestSalesAmount: [...tempData],
        loading: false,
        error: null
      };
    case ActionTypes.BIGGEST_SALES_AMOUNT_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    default:
      return state;
  }
};
export default BiggestSalesAmountReducer;
