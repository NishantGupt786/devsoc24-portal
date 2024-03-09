import React from "react";
import TrackCard from "./TrackCard";

const tracks = [
  {
    imgsrc: "/images/trackImg1.svg",
    name: "Secret Track 1",
  },
  {
    imgsrc: "/images/trackImg1.svg",
    name: "Secret Track 2",
  },
  {
    imgsrc: "/images/trackImg1.svg",
    name: "Secret Track 3",
  },
  {
    imgsrc: "/images/trackImg1.svg",
    name: "Secret Track 4",
  },
  {
    imgsrc: "/images/trackImg1.svg",
    name: "Secret Track 5",
  },
  {
    imgsrc: "/images/trackImg1.svg",
    name: "Secret Track 6",
  },
];
const TrackComponent = () => {
  return (
    <div className="trackComponent h-full overflow-auto rounded-xl w-full md:w-[32vw] bg-white px-6">
      <div className="pl-3 pt-2 font-semibold text-[#45464E]">
        Track Details
      </div>
      <div className="my-6 flex w-full flex-col items-center gap-6">
        {tracks.map((item, index) => (
          <TrackCard imagesrc={item.imgsrc} name={item.name} key={index} />
        ))}
      </div>
    </div>
  );
};

export default TrackComponent;
