import React from "react";

const categories = [
  "All",
  "Cricket",
  "Music",
  "Live",
  "Gaming",
  "Gardening",
  "News",
  "New to you",
  "Exercise",
  "Nutrition",
  "Stocks",
  "Wealth",
  "Devices",
  "Apple",
  "university",
  "Masters",
  "Ph.D",
];
const ListItems = () => {
  return (
    <div className="flex overflow-x-scroll scrollbar-none  hover:scrollbar-thin px-4">
      <div className="flex space-x-4 flex-nowrap">
        {categories.map((category) => {
          return (
            <div
              key={category}
              className="m-4 flex-none bg-gray-100 hover:bg-gray-200 duration-300 rounded-xl px-2 py-1 font-medium text-black cursor-pointer"
            >
              {category}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListItems;
