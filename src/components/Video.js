import React from "react";
import { Link } from "react-router-dom";
import Time from "../utils/Time";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";
import moment from "moment";

function Video({ video }) {
  const {
    id,
    title,
    thumbnails,
    publishedAt,
    channelTitle,
    channelLogo,
    isVerified,
    views,
    duration,
  } = video;

  return (
    <div className="flex flex-col ">
      <Link to={`/video/${id}`}>
        {/* Thumbnail and duration */}
        <div
          className="relative rounded-lg overflow-hidden group"
          style={{ paddingBottom: "56.25%" }}
        >
          <img
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform group-hover:scale-105"
            src={thumbnails?.maxres?.url || thumbnails?.default?.url}
            alt="Thumbnail"
          />
          {duration && moment.duration(duration).isValid() && (
            <Time time={duration} />
          )}
        </div>

        {/* Video details */}
        <div className="flex mt-3 space-x-3">
          {/* Channel logo */}
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={channelLogo}
              alt="Channel Logo"
            />
          </div>

          {/* Title and metadata */}
          <div className="flex flex-col">
            <span className="text-base font-semibold text-gray-900 line-clamp-2">
              {title}
            </span>
            <span className="flex items-center text-sm text-gray-600 mt-1">
              {channelTitle}
              {isVerified && (
                <BsFillCheckCircleFill className="text-gray-600 ml-1 text-[12px]" />
              )}
            </span>
            <div className="text-sm text-gray-600 flex gap-1 mt-1">
              <span>{`${abbreviateNumber(views, 2)} views`}</span>
              <span>·</span>
              <span>{moment(publishedAt).fromNow()}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Video;

//export const AdVideoCard = ({ info }) => {
//  return (
//   <div className="relative">
///     <VideoCard info={info} />
//     <span className="absolute top-0 right-0 bg-yellow-400 text-xs p-1 rounded-lg">
//       Ad
//     </span>
//   </div>
// );
//};

//export default VideoCard;
