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
];

const TimelineComponent = (props: { count: number }) => {
  return (
    <div className="flex h-[20vh] w-screen flex-col overflow-x-auto bg-white">
      <div className="flex w-full items-center justify-between pl-6 pt-4 font-semibold text-[#45464E]">
        <p>Timeline</p>
        {timelineData.slice(0, props.count).map(() => {
          return (
            <div className="flex h-[10px] w-[10px] items-center justify-center rounded-full bg-primary">
              <Image
                src={img1}
                alt="completed"
                height={0}
                width={0}
                className="h-fit  w-full "
              />
            </div>
          );
        })}
        <div className="flex h-[10px] w-[10px] items-center justify-center rounded-full bg-primary">
          <Image
            src={img2}
            alt="completed"
            height={0}
            width={0}
            className="h-fit  w-full "
          />
        </div>
        {timelineData.slice(props.count).map(() => {
          return (
            <div className="flex h-[10px] w-[10px] items-center justify-center rounded-full bg-primary">
              <Image
                src={img3}
                alt="completed"
                height={0}
                width={0}
                className="h-fit  w-full "
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineComponent;
