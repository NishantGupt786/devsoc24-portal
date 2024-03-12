"use client";
import React from "react";
import img1 from "@/assets/images/timeline/completed.svg";
import img2 from "@/assets/images/timeline/half.svg";
import img3 from "@/assets/images/timeline/none.svg";
import Image from "next/image";

const timelineData = ["label1", "label1", "label1", "label1", "label1"];

const TimelineComponent = (props: { count: number }) => {
  return (
    <div className="flex  h-[25vh] w-full rounded-xl bg-white">
      <div className="flex w-full flex-col items-center  justify-between  pl-6 pt-4 font-semibold text-[#45464E]">
        <p className="self-start">Timeline</p>
        <div className="trackComponent flex h-full w-full flex-row items-center overflow-x-auto">
          {timelineData.slice(0, props.count).map((item, index) => {
            return (
              <div
                className=" flex h-fit flex-col items-center justify-center "
                key={index}
              >
                <Image
                  src={img1 as HTMLImageElement}
                  alt="completed"
                  height={0}
                  width={0}
                  className="min-h-auto min-w-max "
                />
                <p className=" m-1 w-full text-center ">
                  {timelineData[index]}
                </p>
              </div>
            );
          })}

          <div className=" flex h-fit flex-col items-center justify-center ">
            <Image
              src={img2 as HTMLImageElement}
              alt="completed"
              height={0}
              width={0}
              className="min-h-auto min-w-max "
            />
            <p className=" m-1 w-full text-center ">
              {timelineData[props.count]}
            </p>
          </div>

          {timelineData.slice(props.count).map((item, index) => {
            return (
              <div
                className=" flex h-fit flex-col items-center justify-center "
                key={index}
              >
                <Image
                  src={img3 as HTMLImageElement}
                  alt="completed"
                  height={0}
                  width={0}
                  className="min-h-auto min-w-max "
                />
                <p className=" m-1 w-full text-center ">
                  {timelineData[index]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineComponent;
