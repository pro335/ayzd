import isValid from './isValid';

const reduceTextLengh = (data, len) =>  {
  if(!isValid(data))
    return "";
  if(data.length < len)
    return data;
  return data.slice(0, len) + " ...";
}

export default reduceTextLengh;