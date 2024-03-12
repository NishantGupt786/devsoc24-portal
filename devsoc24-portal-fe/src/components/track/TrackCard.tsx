import React from "react";
import Image from "next/image";

const TrackCard = (props: { name: string; imagesrc: string }) => {
  return (
    <div className="h-[300px] w-full overflow-hidden rounded-2xl flex flex-col items-center relative border-2 border-black">
      <Image
        src={props.imagesrc}
        alt="track image"
        height={0}
        width={0}
        className="h-auto w-full"
      />
      <div className="flex h-[50px] w-full items-center bg-[#3B3B3B] pl-4 font-semibold text-white absolute bottom-0">
        {props.name}
      </div>
    </div>
  );
};

export default TrackCard;
