import isValid from './isValid';

const timeDiffCalc = (dateFuture, dateNow) => {

  if(!isValid(dateFuture) || !isValid(dateNow))
    return "-1";

  let diffInMilliSeconds = (dateFuture - dateNow) / 1000;

  if(diffInMilliSeconds <= 0)
    return "Dropped";

  // calculate days
  let days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;
  // console.log('calculated days', days);

  // calculate hours
  let hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;
  // console.log('calculated hours', hours);

  // calculate minutes
  let minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;
  // console.log('minutes', minutes);

  // calculate seconds
  let seconds = Math.floor(diffInMilliSeconds);

  let difference = 'In ';

  if (days > 0)
    difference += (days === 1) ? `${days} day ` : `${days} days `;

  if (hours > 0)
    difference += `${hours}h `;

  if (minutes > 0)
    difference += `${minutes}m `; 

  if (seconds > 0)
    difference += `${seconds}s`; 

  return difference;

}

export default timeDiffCalc;