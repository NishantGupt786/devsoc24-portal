"use client";
import React from "react";
import img1 from "@/assets/images/timeline/completed.svg";
import img2 from "@/assets/images/timeline/half.svg";
import img3 from "@/assets/images/timeline/none.svg";
import Image from "next/image";

const timelineData = [
  "label1",
  "label2",
  "label3",
  "label4",
  "label5",
  "label6",
  "label7",
  "label8",
  "label9",
  "label10",
  "label11",
  "label11",
  "label11",
];

const TimelineComponent = (props: { count: number }) => {
  return (
    <div className="flex h-[20vh] w-full overflow-x-auto bg-white">
      <div className="flex w-full flex-col items-center justify-between pl-6 pt-4 font-semibold text-[#45464E]">
        <p className="self-start">
          Timeline (Page not cooked completely, class ke baad ab)
        </p>
        <div className="flex h-full flex-row  items-center">
          {timelineData.slice(0, props.count).map((item, index) => {
            return (
              <div className="relative flex h-fit w-fit " key={index}>
                <Image
                  src={img1 as HTMLImageElement}
                  alt="completed"
                  height={0}
                  width={0}
                  className="h-auto w-fit"
                />
                <p className="absolute left-auto right-auto w-full ">
                  {timelineData[index]}
                </p>
              </div>
            );
          })}

          <div className="relative flex h-fit w-fit ">
            <Image
              src={img2 as HTMLImageElement}
              alt="completed"
              height={0}
              width={0}
              className="h-auto w-fit"
            />
            <p className="absolute left-auto right-auto w-full ">
              {timelineData[props.count]}
            </p>
          </div>

          {timelineData.slice(0, props.count).map((item, index) => {
            return (
              <div className="relative flex h-fit w-fit " key={index}>
                <Image
                  src={img3 as HTMLImageElement}
                  alt="completed"
                  height={0}
                  width={0}
                  className="h-auto w-fit"
                />
                <p className="absolute left-auto right-auto w-full ">
                  {timelineData[props.count + index]}
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
