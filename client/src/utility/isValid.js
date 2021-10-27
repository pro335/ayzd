const isValid = (data) =>  {
  if( data === null || data === undefined || data === "" || data.length === 0 || JSON.stringify(data) === JSON.stringify({}) )
    return false;
  return true;
}

export default isValid; 