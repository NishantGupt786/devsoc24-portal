import React from "react";
import Image from "next/image";

const TrackCard = (props: { name: string; imagesrc: string }) => {
  return (
    <div className="h-fit w-full overflow-hidden rounded-2xl">
      <Image
        src={props.imagesrc}
        alt="track image"
        height={0}
        width={0}
        className="h-auto w-full bg-cover"
      />
      <div className="flex h-[40px] w-full items-center bg-[#3B3B3B] pl-4 font-semibold text-white">
        {props.name}
      </div>
    </div>
  );
};

export default TrackCard;
