import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/api";
import SearchCard from "./SearchCard";
import Sidebar from "./Sidebar";

const Search = () => {
  const [results, setResults] = useState([]);
  const { searchQuery } = useParams();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // Step 1: Fetch videos from the search endpoint
        const searchResponse = await fetchData("search", {
          part: "snippet",
          type: "video",
          maxResults: 25,
          q: searchQuery,
        });

        const videoIds = searchResponse.items
          .map((item) => item.id.videoId)
          .filter(Boolean)
          .join(",");

        if (!videoIds) {
          console.error("No video IDs found.");
          return;
        }

        // Step 2: Fetch video details for statistics and duration
        const videosResponse = await fetchData("videos", {
          part: "snippet,statistics,contentDetails",
          id: videoIds,
        });
        console.log("videoResponse", videosResponse);
        const combinedResults = videosResponse.items.map((video) => ({
          id: video.id,
          title: video.snippet.title,
          description: video.snippet.description,
          thumbnail: video.snippet.thumbnails.standard.url,
          publishedAt: video.snippet.publishedAt,
          channelTitle: video.snippet.channelTitle,
          channelId: video.snippet.channelId,
          views: video.statistics.viewCount,
          duration: video.contentDetails.duration,
        }));

        setResults(combinedResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  return (
    <div className="flex flex-row mt-20 h-[calc(100%-40px)]">
      <Sidebar className="w-60 flex-none" />
      <div className="grow h-[calc(100vh-6.625rem)] overflow-y-scroll overflow-x-hidden">
        <div className="grid grid-cols-1 gap-2 p-2">
          {results.map((video, index) => (
            <SearchCard key={index} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
