import { createContext, useContext, useState, useEffect } from "react";
import { fetchData } from "../utils/api";
//import axios from "axios"
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState("New");

  useEffect(() => {
    fetchAllData(value);
  }, [value]);

  const fetchAllData = async (query) => {
    setLoading(true);
    try {
      const response = await fetchData("search", {
        part: "snippet",
        q: query,
        type: "video",
        maxResults: 25,
      });
      console.log("Search API Data:", response.items);

      const videoIds = response.items.map((item) => item.id.videoId).join(",");
      const channelIds = response.items.map((item) => item.snippet.channelId);

      const videoResponse = await fetchData("videos", {
        part: "snippet,statistics,contentDetails",
        id: videoIds,
      });
      console.log("video details API Data:", videoResponse);

      const channelDetailsResponse = await fetchData("channels", {
        part: "snippet,statistics",
        id: channelIds.join(","),
      });
      console.log("channel details API Data:", channelDetailsResponse);

      /*
      * Function fetchRelatedVideos is currently not in use.
      
      const fetchRelatedVideos = async (videoId) => {
        try {
          const response = await fetchData("search", {
            part: "snippet",
            relatedToVideoId: videoId,
            type: "video",
            maxResults: 25,
          });
          console.log(response.items);
          return response.items; // Return related videos
        } catch (error) {
          console.error("Error fetching related videos:", error);
          return [];
        }
      };*/

      const channelDetails = channelDetailsResponse.items.reduce(
        (acc, channel) => {
          acc[channel.id] = {
            channelTitle: channel.snippet.title,
            channelLogo: channel.snippet.thumbnails.high.url,
            isVerified: Boolean(channel.snippet.customUrl),
            subscriberCount: channel.statistics.subscriberCount,
          };
          return acc;
        },
        {}
      );

      const contents = videoResponse.items.map((video) => {
        const channelId = video.snippet.channelId;
        return {
          id: video.id,
          title: video.snippet.title,
          thumbnails: video.snippet.thumbnails,
          views: video.statistics.viewCount,
          likes: video.statistics.likeCount,
          duration: video.contentDetails.duration,
          publishedAt: video.snippet.publishedAt,
          channelTitle: channelDetails[channelId]?.channelTitle,
          channelLogo: channelDetails[channelId]?.channelLogo,
          isVerified: channelDetails[channelId]?.isVerified,
          subscriberCount: channelDetails[channelId]?.subscriberCount,
        };
      });
      setData(contents);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider value={{ loading, data, value, setValue }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
