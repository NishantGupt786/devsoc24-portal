import React from "react";
import img1 from "@/assets/images/timeline/completed.svg";
import img2 from "@/assets/images/timeline/half.svg";
import img3 from "@/assets/images/timeline/none.svg";
import Image from "next/image";

const timelineData = [
  {
    date: "2nd August",
    time: "20:00",
    desc: "Hack Starts",
  },
  {
    date: "3rd August",
    time: "00:00",
    desc: "Review 1(idea based)",
  },
  {
    date: "3rd August",
    time: "22:00",
    desc: "Review 2(implementation)",
  },
  {
    date: "4th August",
    time: "15:00",
    desc: "Final reviews",
  },
];

const TimelineComponent = (props: { count: number }) => {
  return (
    <div className="trackComponent flex min-h-[25vh] h-fit w-full overflow-auto rounded-xl bg-white">
      <div className="flex flex-col items-center justify-between pl-6 pt-4 font-semibold text-[#45464E] ">
        <p className="self-start">Timeline</p>
        <div className=" flex min-h-[25vh] h-fit flex-row items-center overflow-x-auto">
          {timelineData.map((item, index) => {
            if (index < props.count) {
              return (
                <div
                  className="flex h-fit flex-col items-center justify-center"
                  key={index}
                >
                  <Image
                    src={img1 as HTMLImageElement}
                    alt="completed"
                    height={50}
                    width={50}
                    className="h-auto min-h-[100px] w-fit min-w-[300px]"
                  />
                  <div className="flex-col m-1 flex w-full text-center">
                    <p>{timelineData[index]?.desc}</p>
                    <p className="text-[12px] text-black/70">{timelineData[index]?.time}</p>
                    <p className="text-[12px] text-black/70">{timelineData[index]?.date}</p>
                  </div>
                </div>
              );
            } else if (index === props.count) {
              return (
                <div
                  className="flex h-fit flex-col items-center justify-center"
                  key={index}
                >
                  <Image
                    src={img2 as HTMLImageElement}
                    alt="half"
                    height={50}
                    width={50}
                    className="h-auto min-h-[100px] w-fit min-w-[300px]"
                  />
                  <div className="flex-col m-1 flex w-full text-center">
                    <p>{timelineData[index]?.desc}</p>
                    <p className="text-[12px] text-black/70">{timelineData[index]?.time}</p>
                    <p className="text-[12px] text-black/70">{timelineData[index]?.date}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className="flex h-fit flex-col items-center justify-center"
                  key={index}
                >
                  <Image
                    src={img3 as HTMLImageElement}
                    alt="none"
                    height={50}
                    width={50}
                    className="h-auto min-h-[100px] w-fit min-w-[300px]"
                  />
                  <div className="flex-col m-1 flex w-full text-center">
                    <p>{timelineData[index]?.desc}</p>
                    <p className="text-[12px] text-black/70">{timelineData[index]?.time}</p>
                    <p className="text-[12px] text-black/70">{timelineData[index]?.date}</p>
                  </div>
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
