import React from "react";
import img1 from "@/assets/images/timeline/completed.svg";
import img2 from "@/assets/images/timeline/half.svg";
import img3 from "@/assets/images/timeline/none.svg";
import Image from "next/image";

const timelineData = [
  {
    date: "17th March",
    time: "18:00",
    desc: "Entry and Registration",
  },
  {
    date: "17th March",
    time: "20:00",
    desc: "Hacking Starts",
  },
  {
    date: "18th March",
    time: "3:00",
    desc: "Review 1",
  },
  {
    date: "18th March",
    time: "12:00",
    desc: "ContentStack speaker session",
  },
  {
    date: "18th March",
    time: "16:00",
    desc: "Akhil Sharma speaker session",
  },
  {
    date: "18th March",
    time: "22:00",
    desc: "Saurabh Soni speaker session",
  },
  {
    date: "19th March",
    time: "2:00",
    desc: "Review 2",
  },
  {
    date: "19th March",
    time: "13:00",
    desc: "End of Hacking",
  },
  {
    date: "19th March",
    time: "14:00",
    desc: "Final Pitches",
  },
  {
    date: "19th March",
    time: "16:00",
    desc: "Prize distribution and Closing",
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
                    className="h-auto w-fit min-w-[320px]"
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
                    className="h-auto w-fit min-w-[320px]"
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
