import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import moment from 'moment';
import { createPopper } from "@popperjs/core";
// import ApiCalendar from "react-google-calendar-api";

const color = "pink";

const Card = ({ item }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    history.push(`/projects/${item.unique_id}`);
  }

  const addDefaultSrc = (e) => {
    e.target.src = '/assets/images/default_image.svg';
  }

  const addToCalendar = () => {
    // let stDate = "2021-11-01T12:00:00+05:30";
    // let endDate = "2021-11-01T15:00:00+05:30";
    // const event = {
    //   summary: "new event created",
    //   description: "demo of create event function",
    //   start: {
    //     dateTime: stDate
    //   },
    //   end: {
    //     dateTime: endDate
    //   }
    // };

    // ApiCalendar.createEvent(event)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));

    let stDate = isValid(item.upcoming_date) ? moment(item.upcoming_date).format("YYYYMMDDTHHmmss") : moment(new Date()).format("YYYYMMDDTHHmmss");
    let endDate = isValid(item.upcoming_date) ? moment(item.upcoming_date).add(30, 'minutes').format("YYYYMMDDTHHmmss") : moment(new Date()).format("YYYYMMDDTHHmmss");
    let text = isValid(item.name) ? item.name : "Upcoming project";
    let location = isValid(item.app_link) ? item.app_link : "https://app.ayzd.com";
    let details = isValid(item.small_description) ? item.small_description : "Drop calendar";

    let url = `https://calendar.google.com/calendar/u/0/r/eventedit?ctz=Europe/Riga&dates=${stDate}/${endDate}&details=${details}&location=${location}&text=${text}`;
    window.open(url, "_blank");

  }

  var main_image = isValid(item) && isValid(item.main_image) && isValid(item.main_image.url) ? item.main_image.url : `${config.bucket_url}/${config.common_image}`;

  //the start of the variables and methods to show tooltip
  const [tooltipShow, setTooltipShow] = React.useState(false);
  const twitter_btnRef = React.createRef();
  const discord_btnRef = React.createRef();
  const tooltipRef = React.createRef();
  const openTooltip_twitter = () => {
    createPopper(twitter_btnRef.current, tooltipRef.current, {
      placement: "top"
    });
    setTooltipShow(true);
  };
  const openTooltip_discord = (type) => {
    createPopper(discord_btnRef.current, tooltipRef.current, {
      placement: "top"
    });
    setTooltipShow(true);
  };
  const closeLeftTooltip = () => {
    setTooltipShow(false);
  };
  //end of the vaiables and methods to show tooltip

  return (
    <div>
      <div className="bg-brand-gray-800 border border-brand-gray-800 rounded-xl overflow-hidden">
        <div
          className="block h-41 xl:h-52 relative hover:cursor-pointer"
          onClick={handleClick}
        >
          <img className="w-full h-full object-cover" src={main_image} alt="" onError={addDefaultSrc} />
          <div className="h-7 absolute inset-y-0 top-0 right-0 text-white bg-base px-2 py-1 mt-2 mr-2 rounded-md">{isValid(item.price) ? `${item.price}` : null}</div>
        </div>
        <div
          className="text-xs font-medium px-3 py-2 hover:cursor-pointer"
          onClick={handleClick}
        >
          <p>
            {isValid(item.upcoming_date) ? moment(item.upcoming_date).format("MMM D, YYYY hh:mm A") : null}
          </p>
          <p className="text-sm text-gray-300">
            {item.name}
          </p>
          <p>
            {isValid(item.mint_size) ? `Mint size: ${item.mint_size}` : null}
          </p>
        </div>
        <div className="border-t text-xs font-medium px-3 pb-3" style={{borderColor: "rgba(255, 255, 255, 0.1)"}}>
          {isValid(item.twitter_members) ? 
            <div
              className="flex flex-row mt-3 hover:cursor-pointer"
              onClick={handleClick}
            >
              <div className="flex space-x-2">
                <svg className="w-4 h-4">
                  <use href="/assets/icons/twitter.svg#twitter"></use>
                </svg>
                <p>{item.twitter_members}</p>
              </div>
              {isValid(item.twitter_members_24h) &&
                <div
                  className="flex flex-row order-2 ml-auto"
                  onMouseEnter={openTooltip_twitter}
                  onMouseLeave={closeLeftTooltip}
                  ref={twitter_btnRef}
                >
                  <p className={`${item.twitter_members >= item.twitter_members_24h ? 'text-green-400' : 'text-red-500'} ml-auto`}>
                    {item.twitter_members >= item.twitter_members_24h ? '+' : '-'} {(Math.abs(item.twitter_members - item.twitter_members_24h) / item.twitter_members * 100).toFixed(2)} %
                  </p>
                </div>
              }
            </div>          
            : 
            null
          }
          {isValid(item.discord_members) ? 
            <div
              className="flex flex-row hover:cursor-pointer mt-1"
              onClick={handleClick}
            >
              <div className="flex space-x-2">
                <svg className="w-4 h-4">
                  <use href="/assets/icons/discord.svg#discord"></use>
                </svg>
                <p>{item.discord_members}</p>
              </div>
              {isValid(item.discord_members_24h) &&
                <div
                  className="flex flex-row order-2 ml-auto"
                  onMouseEnter={openTooltip_discord}
                  onMouseLeave={closeLeftTooltip}
                  ref={discord_btnRef}
                >

                  <p className={`${item.discord_members >= item.discord_members_24h ? 'text-green-400' : 'text-red-500'} ml-auto`}>
                    {item.discord_members >= item.discord_members_24h ? '+' : '-'} {(Math.abs(item.discord_members - item.discord_members_24h)/item.discord_members*100).toFixed(2)}%
                  </p>
                </div>
              }
            </div>          
            : 
            null
          }
          <button
            className="flex flex-row items-center justify-center font-medium space-x-3 bg-black hover:bg-brand-calendar-button hover:border-brand-calendar-button text-white leading-7 rounded-xl px-2 lg:px-4 py-1.5 mx-auto mt-3 w-full onHover"
            onClick={addToCalendar}
          >
            <img src="/assets/icons/plus.svg" alt="" />
            <p>Add to calendar</p>
          </button>
        </div>
      </div>
      <div
        className={
          (tooltipShow ? "" : "hidden ") +
          "bg-" +
          color +
          "-600 border-0 mt-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg"
        }
        ref={tooltipRef}
      >
        <div>
          <div
            className={
              "bg-black text-white opacity-75 p-2 mb-1 rounded-lg"
            }
          >
            Gain in 24h
          </div>
        </div>
      </div>      
    </div>
  )
}

export default Card
