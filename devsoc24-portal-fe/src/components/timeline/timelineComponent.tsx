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
];

const TimelineComponent = (props: { count: number }) => {
  return (
    <div className="trackComponent flex h-[25vh] rounded-xl bg-white w-full overflow-auto">
      <div className="flex flex-col items-center justify-between pl-6 pt-4 font-semibold text-[#45464E] ">
        <p className="self-start">Timeline</p>
        <div className=" flex h-full flex-row items-center overflow-x-auto">
          {timelineData.map((item, index) => {
            if (index < props.count) {
              return (
                <div
                  className="flex h-fit flex-col items-center justify-center"
                  key={index}
                >
                  <Image
                    src={img1}
                    alt="completed"
                    height={50}
                    width={50}
                    className="h-auto w-fit min-w-[300px]"
                  />
                  <p className="m-1 w-full text-center">
                    {timelineData[index]}
                  </p>
                </div>
              );
            } else if (index === props.count) {
              return (
                <div
                  className="flex h-fit flex-col items-center justify-center"
                  key={index}
                >
                  <Image
                    src={img2}
                    alt="half"
                    height={50}
                    width={50}
                    className="h-auto w-fit min-w-[320px]"
                  />
                  <p className="m-1 w-full text-center">
                    {timelineData[index]}
                  </p>
                </div>
              );
            } else {
              return (
                <div
                  className="flex h-fit flex-col items-center justify-center"
                  key={index}
                >
                  <Image
                    src={img3}
                    alt="none"
                    height={50}
                    width={50}
                    className="h-auto w-fit min-w-[320px]"
                  />
                  <p className="m-1 w-full text-center">
                    {timelineData[index]}
                  </p>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineComponent;
