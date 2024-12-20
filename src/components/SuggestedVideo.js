import React from "react";
import { Link } from "react-router-dom";
import Time from "../utils/Time";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";
import moment from "moment";
const SuggestedVideo = ({ video }) => {
  return (
    <div className="">
      <Link to={`/video/${video?.id}`}>
        <div className="flex mb-3 ">
          <div className="relative overflow-hidden border h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl hover:rounded-none duration-200">
            <img
              className="h-full w-full rounded-lg object-cover"
              src={video?.snippet?.thumbnails?.high?.url}
              alt="thumbnail"
            />
            {video?.duration && <Time time={video?.duration} />}
          </div>
          <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-sm lg:text-xs xl:text-sm font-semibold line-clamp-2 ">
              {video?.snippet?.title}
            </span>
            <span className="text-[12px] text-gray-600 lg:text-[10px] xl:text-[12px] mt-2  flex items-center">
              {video?.snippet?.channelTitle}
              {video?.channel?.isVerified && (
                <BsFillCheckCircleFill className=" text-[12px] text-gray-600 lg:text-[10px] xl:text-[12px] ml-1" />
              )}
            </span>
            <div className="flex text-gray-600 text-[12px] lg:text-[10px] xl:text-[12px]  truncate overflow-hidden">
              <span>{`${abbreviateNumber(
                video?.statistics?.viewCount,
                2
              )} views`}</span>
              <span className="flex text-[24px] leading-none font-bold  relative top-[-10px] mx-1">
                .
              </span>
              <span className="truncate">
                {moment(video?.snippet?.publishedAt).fromNow()}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SuggestedVideo;
