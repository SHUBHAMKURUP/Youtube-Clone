import React from "react";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import moment from "moment";
import { abbreviateNumber } from "js-abbreviation-number";
import Time from "../utils/Time";

const SearchCard = ({ video }) => {
  const {
    id,
    title,
    thumbnail,
    publishedAt,
    channelTitle,
    views,
    description,
    duration,
  } = video;

  return (
    <div className="flex flex-col md:flex-row mb-6 border-b border-gray-300 pb-4">
      {/* Thumbnail */}
      <div className="relative flex-none w-full  md:w-2/5 aspect-w-16 aspect-h-9 ">
        <Link to={`/video/${id}`}>
          <img
            className="w-full h-56 object-cover rounded-lg transition-transform duration-200 hover:scale-105"
            src={thumbnail}
            alt="Thumbnail"
          />
          {duration && (
            <div className="absolute bottom-1 right-1 bg-black text-white text-xs font-semibold px-1 rounded">
              <Time time={duration} />
            </div>
          )}
        </Link>
      </div>

      {/* Video Details */}
      <div className="flex flex-col flex-grow mt-3 md:mt-0 md:ml-4">
        <Link to={`/video/${id}`}>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-blue-600">
            {title}
          </h3>
        </Link>

        <div className=" flex items-center text-sm font-semibold text-gray-500 mt-2">
          <span>{channelTitle}</span>
          <BsFillCheckCircleFill className="text-gray-600 text-[12px] ml-1" />
        </div>

        <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
          <span>{abbreviateNumber(views, 2)} views</span>
          <span>·</span>
          <span>{moment(publishedAt).fromNow()}</span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default SearchCard;
