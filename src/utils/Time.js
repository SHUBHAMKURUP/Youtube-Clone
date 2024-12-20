import React from "react";
import moment from "moment";
import "moment-duration-format";

function Time({ time }) {
  let videoTime;

  try {
    const duration = moment.duration(time);
    videoTime = duration.format(duration.asHours() >= 1 ? "h:mm:ss" : "m:ss", {
      trim: false,
    });
  } catch {
    videoTime = "0:00"; // Fallback for invalid durations
  }

  return (
    <div>
      <span className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 text-xs rounded-md">
        {videoTime}
      </span>
    </div>
  );
}

export default Time;
