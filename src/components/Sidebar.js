import React from "react";
import { GoHome } from "react-icons/go";
import { MdOutlineSubscriptions, MdHistory } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa6";
// cspell: disable-next-line
import { SiYoutubestudio } from "react-icons/si";
// cspell: disable-next-line
import { SiYoutubekids } from "react-icons/si";
import { MdOutlineWatchLater } from "react-icons/md";
// cspell: disable-next-line
import { SiYoutubemusic } from "react-icons/si";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiFilmSlateLight } from "react-icons/pi";
import { CgMediaLive } from "react-icons/cg";
import { TfiCup } from "react-icons/tfi";
import { PiLightbulbLight } from "react-icons/pi";
import { SiStylelint } from "react-icons/si";
import { MdPodcasts } from "react-icons/md";
import { BiNews, BiVideo } from "react-icons/bi";
import { LiaDownloadSolid } from "react-icons/lia";
import { LiaFireAltSolid } from "react-icons/lia";
import { PiMusicNoteLight } from "react-icons/pi";
import { MdHome } from "react-icons/md";
// cspell: disable-next-line
import { SiYoutubeshorts } from "react-icons/si";
import { CiYoutube } from "react-icons/ci";
import { useSidebar } from "../context/SidebarContext";
const Sidebar = () => {
  const { isSidebarOpen } = useSidebar();

  const sidebarItems = [
    {
      id: 1,
      name: "Home",
      icon: <GoHome />,
    },
    {
      id: 2,
      name: "Shorts",

      // cspell: disable-next-line
      icon: <SiYoutubeshorts />,
    },
    {
      id: 3,
      name: "Subscription",
      icon: <MdOutlineSubscriptions />,
    },
  ];
  const sidebarItems2 = [
    {
      id: 1,
      name: "Your Channel",
      icon: <GoHome />,
    },
    {
      id: 2,
      name: "History",
      icon: <MdHistory />,
    },
    {
      id: 3,
      name: "Playlists",
      icon: <MdOutlineSubscriptions />,
    },
    {
      id: 4,
      name: "Your videos",
      icon: <BiVideo />,
    },
    {
      id: 5,
      name: "Watch later",
      icon: <MdOutlineWatchLater />,
    },
    {
      id: 6,
      name: "Liked Videos",
      icon: <AiOutlineLike />,
    },
    {
      id: 7,
      name: "Downloads",
      icon: <LiaDownloadSolid />,
    },
  ];
  const sidebarItems3 = [
    {
      id: 1,
      name: "Trending",
      icon: <LiaFireAltSolid />,
    },
    {
      id: 2,
      name: "Shopping",
      icon: <HiOutlineShoppingBag />,
    },
    {
      id: 3,
      name: "Music",
      icon: <PiMusicNoteLight />,
    },
    {
      id: 4,
      name: "Film",
      icon: <PiFilmSlateLight />,
    },
    {
      id: 5,
      name: "Live",
      icon: <CgMediaLive />,
    },
    {
      id: 6,
      name: "Gaming",
      icon: <IoGameControllerOutline />,
    },
    {
      id: 7,
      name: "News",
      icon: <BiNews />,
    },
    {
      id: 8,
      name: "Sport",
      icon: <TfiCup />,
    },
    {
      id: 9,
      name: "Courses",
      icon: <PiLightbulbLight />,
    },
    {
      id: 10,
      name: "Fashion & beauty",
      icon: <SiStylelint />,
    },
    {
      id: 11,
      name: "Podcasts",
      icon: <MdPodcasts />,
    },
  ];
  const sidebarItems4 = [
    {
      id: 1,
      name: "Youtube Studio",
      // cspell: disable-next-line
      icon: <SiYoutubestudio />,
    },
    {
      id: 2,
      name: "Youtube Music",
      // cspell: disable-next-line
      icon: <SiYoutubemusic />,
    },
    {
      id: 3,
      name: "Youtube Kids",
      // cspell: disable-next-line
      icon: <SiYoutubekids />,
    },
  ];

  const sidebarItems6 = [
    {
      id: 1,
      name: "Home",
      icon: <MdHome />,
    },
    {
      id: 2,
      name: "Shorts",
      // cspell: disable-next-line
      icon: <SiYoutubeshorts />,
    },
    {
      id: 3,
      name: "Subscriptions",
      icon: <MdOutlineSubscriptions />,
    },
    {
      id: 4,
      name: "Youtube Music",
      // cspell: disable-next-line
      icon: <SiYoutubemusic />,
    },
    {
      id: 5,
      name: "You",
      icon: <CiYoutube />,
    },
    {
      id: 6,
      name: "Downloads",
      icon: <LiaDownloadSolid />,
    },
  ];

  return (
    <div className="">
      {isSidebarOpen ? (
        <div className="px-6 w-60 h-[calc(100vh-6.625rem)] overflow-y-scroll overflow-x-hidden flex-shrink-0  z-40">
          {/* Home */}
          <div className=" space-y-3 items-center">
            {sidebarItems.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex items-center space-x-6 hover:bg-gray-300 duration-300 rounded-xl p-1"
                >
                  <div className="text-xl cursor-pointer">{item.icon}</div>
                  <span className="cursor-pointer">{item.name}</span>
                </div>
              );
            })}
          </div>
          <br />
          <hr />
          {/* You */}
          <div className="mt-4 space-y-3 items-center">
            <div className="flex items-center space-x-2">
              <h1>You</h1>
              <FaChevronRight />
            </div>
            {sidebarItems2.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex items-center space-x-6 hover:bg-gray-300 duration-300 rounded-xl p-1"
                >
                  <div className="text-xl cursor-pointer">{item.icon}</div>
                  <span className="cursor-pointer">{item.name}</span>
                </div>
              );
            })}
          </div>
          <br />
          <hr />
          {/* Explore */}
          <div className="mt-4 space-y-3 items-center">
            <div className="items-center space-x-2">
              <h1 className=" font-semibold">Explore</h1>
            </div>
            {sidebarItems3.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex items-center space-x-6 hover:bg-gray-300 duration-300 rounded-xl p-1"
                >
                  <div className="text-xl cursor-pointer">{item.icon}</div>
                  <span className="cursor-pointer">{item.name}</span>
                </div>
              );
            })}
          </div>
          <br />
          <hr />
          {/* More section */}
          <div className="mt-4 space-y-3 items-center">
            <div className="items-center space-x-2">
              <h1 className=" font-semibold">More From Youtube</h1>
            </div>
            {sidebarItems4.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex items-center space-x-6 hover:bg-gray-300 duration-300 rounded-xl p-1"
                >
                  <div className="text-xl cursor-pointer text-red-500">
                    {item.icon}
                  </div>
                  <span className="cursor-pointer">{item.name}</span>
                </div>
              );
            })}
            <hr />
          </div>
          <br />
          <span className="text-xs text-gray-600 font-semibold">
            About Press Copyright <br /> Contact us Creators <br /> Advertise
            Developers <br />
            <p className="mt-3">Terms Privacy Policy & Safety</p> How YouTube
            works <br /> Test new features
          </span>
          <br />
          {/* cspell: disable-next-line */}
          <p className="text-xs text-gray-500 mt-3">© 2024 Shubham Kurup</p>
        </div>
      ) : (
        <div className="w-16">
          <div className=" space-y-3 items-center">
            {sidebarItems6.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex flex-col items-center justify-center hover:bg-gray-300 duration-300 rounded-xl mx-4 p-2 cursor-pointer"
                >
                  <div className="text-2xl">{item.icon}</div>
                  <span className="text-xs mt-1 text-center">{item.name}</span>
                </div>
              );
            })}
          </div>
          <br />
          <hr />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
