import React from "react";
import Sidebar from "./Sidebar";
import Video from "./Video";
import { useAuth } from "../context/AuthProvider";
import ListItems from "./ListItems";
import { useSidebar } from "../context/SidebarContext";
function Home() {
  const { data, loading } = useAuth();

  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const ModelOverlay = () => {
    return (
      <div
        className="fixed inset-0 z-30 bg-black bg-opacity-50 pointer-events-auto"
        onClick={toggleSidebar}
      ></div>
    );
  };

  return (
    <div className="flex mt-20 ">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1  h-[calc(100vh-6.625rem)] overflow-y-auto">
        <ListItems />

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {!loading && data?.length > 0 ? (
            data.map((item) => <Video key={item.id} video={item} />)
          ) : !loading ? (
            <p className="col-span-full text-center text-gray-500">
              No videos available.
            </p>
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Loading...
            </p>
          )}
        </div>
        {isSidebarOpen ? <ModelOverlay /> : null}
      </div>
    </div>
  );
}

export default Home;
