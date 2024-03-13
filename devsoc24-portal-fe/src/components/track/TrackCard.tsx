import React from "react";
import Image from "next/image";

const TrackCard = (props: { name: string; imagesrc: string }) => {
  return (
    <div className="md:h-[200px] h-[200px]  md:w-full w-[70vw] overflow-hidden rounded-2xl flex flex-col items-center relative border-2 border-black">
      <Image
        src={props.imagesrc}
        alt="track image"
        height={300}
        width={300}
        className="h-[150px] w-full"
      />
      <div className="flex h-[50px] w-full items-center bg-[#3B3B3B] pl-4 font-semibold text-white absolute bottom-0">
        {props.name}
      </div>
    </div>
  );
};

export default TrackCard;
