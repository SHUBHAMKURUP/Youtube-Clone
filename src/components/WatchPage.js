import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/api";
import ReactPlayer from "react-player";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { PiShareFatLight } from "react-icons/pi";
import { abbreviateNumber } from "js-abbreviation-number";
import SuggestedVideo from "./SuggestedVideo";
import { BsFillCheckCircleFill } from "react-icons/bs";
import moment from "moment";
function WatchPage() {
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchVideoDetails(id);
      fetchRelatedVideos(id);
    }
  }, [id]);

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  const fetchVideoDetails = async (videoId) => {
    console.log("Fetching video and channel details for ID:", videoId);

    try {
      // Fetch video details
      const videoResponse = await fetchData("videos", {
        part: "snippet,statistics,contentDetails",
        id: videoId,
      });
      console.log("videoResponse", videoResponse);

      if (!videoResponse?.items?.length) {
        console.error("No video details found for the given ID.");
        return;
      }

      const videoData = videoResponse.items[0];
      const channelId = videoData.snippet.channelId;

      // Fetch channel details
      const channelResponse = await fetchData("channels", {
        part: "snippet,statistics",
        id: channelId,
      });

      if (!channelResponse?.items?.length) {
        console.error("No channel details found for the given ID.");
        return;
      }

      const channelData = channelResponse.items[0];

      // Combine video and channel details into a single state object
      setVideo({
        id: videoData?.id,
        date: videoData?.publishedAt,
        title: videoData?.snippet?.title,
        thumbnail: videoData?.snippet?.thumbnails?.high?.url,
        description: videoData?.snippet?.description,
        views: videoData?.statistics?.viewCount,
        likes: videoData?.statistics?.likeCount,
        duration: videoData?.contentDetails?.duration,
        channel: {
          id: channelId,
          title: channelData?.snippet?.title,
          logo: channelData?.snippet?.thumbnails?.high?.url,
          subscribersCount: channelData?.statistics?.subscriberCount,
          isVerified: Boolean(channelData?.snippet?.customUrl),
        },
      });
    } catch (error) {
      console.error("Error fetching video or channel details:", error);
    }
  };

  const fetchRelatedVideos = async (videoId) => {
    try {
      // Step 1: Fetch tags of the original video
      const videoDetailsResponse = await fetchData("videos", {
        part: "snippet",
        id: videoId,
      });

      if (!videoDetailsResponse?.items?.length) {
        console.error("No video details found for the given ID.");
        return;
      }

      const videoData = videoDetailsResponse.items[0];
      const tags = videoData?.snippet?.tags;
      const title = videoData?.snippet?.title; // Get the title of the video

      console.log("Tags for the video:", tags);

      // Step 2: Decide on the search query
      let queryTags = "";

      if (tags && tags.length > 0) {
        // If tags are available, use them as the query
        queryTags = tags.slice(0, 3).join(" "); // Use up to 3 tags for broader search
        console.log("Using tags for search query:", queryTags);
      } else if (title) {
        // If no tags are available, fallback to using the video title as the query
        queryTags = title;
        console.log("No tags found, using title for search query:", queryTags);
      } else {
        console.error("No title or tags found for the video.");
        return;
      }

      // Step 3: Fetch related videos using the search endpoint with combined tags or title as query
      const searchResponse = await fetchData("search", {
        part: "snippet",
        type: "video",
        maxResults: 25,
        q: queryTags, // Use combined tags or title as the query
      });

      console.log("searchResponse", searchResponse);

      if (!searchResponse?.items?.length) {
        console.error("No related videos found using the query.");
        return;
      }

      // Extract video IDs
      const videoIds = searchResponse.items
        .map((item) => item.id.videoId)
        .filter(Boolean) // Ensure valid IDs
        .join(",");

      if (!videoIds) {
        console.error("No video IDs extracted from the search response.");
        return;
      }

      // Step 4: Fetch detailed statistics for the related video IDs
      const videosResponse = await fetchData("videos", {
        part: "snippet,statistics",
        id: videoIds,
      });

      if (!videosResponse?.items?.length) {
        console.error("No video details found for the related video IDs.");
        return;
      }

      console.log("relatedVideos", videosResponse);

      // Step 5: Save the related videos to state
      setRelatedVideos(videosResponse.items);
    } catch (error) {
      console.error("Error fetching related videos:", error);
    }
  };

  if (!video) return <div>Loading video details...</div>;
  if (!relatedVideos) return <div>Loading related videos...</div>;

  return (
    <div className="flex flex-col lg:flex-row justify-center mt-16 min-h-screen overflow-hidden">
      {/* Main Video Section */}
      <div className="flex flex-col w-full lg:w-[70%] p-4 rounded-lg">
        <div className="w-full bg-black rounded-lg overflow-hidden">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            width="100%"
            height="400px"
            controls
            playing={true}
          />
        </div>
        <div className="mt-4">
          <h1 className="text-xl font-bold text-gray-900">{video?.title}</h1>
          <div className="flex justify-between items-center mt-2">
            {/* Channel Info */}
            <div className="flex items-center space-x-4">
              <img
                className="h-10 w-10 rounded-full"
                src={video?.channel?.logo}
                alt="channelLogo"
              />
              <div>
                <div className="text-lg font-semibold text-gray-900 flex items-center">
                  {video?.channel?.title}
                  {video?.channel?.isVerified && (
                    <BsFillCheckCircleFill className="text-gray-600 text-sm ml-1" />
                  )}
                </div>
                <div className="text-xs text-gray-600">
                  {abbreviateNumber(video?.channel?.subscribersCount, 1) ||
                    "No subscribers"}{" "}
                  subscribers
                </div>
              </div>
              <button
                onClick={handleSubscribe}
                className="bg-gray-100 text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200"
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>
            {/* Like/Dislike/Share */}
            <div className="flex space-x-4 items-center text-slate-300  ">
              <div className="bg-gray-100 flex m-2 p-2 rounded-full hover:bg-gray-200">
                <button className="flex items-center mr-4 text-black hover:text-gray-900">
                  <AiOutlineLike className="text-xl mr-1" />
                  {abbreviateNumber(video?.likes, 1)}
                </button>
                |
                <button className="flex items-center ml-4 text-black hover:text-gray-900">
                  <AiOutlineDislike className="text-xl mr-1" />
                </button>
              </div>
              <button className="flex bg-gray-100 items-center rounded-full m-2 p-2 hover:bg-gray-200 text-black hover:text-gray-900">
                <PiShareFatLight className="text-xl mr-1" />
                Share
              </button>
            </div>
          </div>
        </div>
        <div className=" mt-2 p-2 bg-gray-200 rounded-lg shadow-sm">
          <div className="flex">
            <div className="flex justify-start text-base font-semibold  h-11 px-2 rounded-3xl bg-white/[0.15] ">
              {`${abbreviateNumber(video?.views)} views`}
            </div>
            <div className="font-semibold">
              {moment(video?.date).format("Do MMMM YYYY")}
            </div>
          </div>
          <p className="text-black whitespace-pre-wrap">
            {video?.description || "No description available."}
          </p>
        </div>
      </div>

      {/* Related Videos Section */}
      <div className="flex flex-col px-4 py-6 h-[calc(100vh-4.625rem)] overflow-y-scroll overflow-x-hidden lg:w-[350px] xl:w-[400px] ">
        <h2 className="text-lg font-semibold text-gray-900">Related Videos</h2>
        {relatedVideos?.length > 0 ? (
          relatedVideos.map((video, index) => (
            <SuggestedVideo key={index} video={video} />
          ))
        ) : (
          <p>Loading related videos...</p>
        )}
      </div>
    </div>
  );
}

export default WatchPage;
