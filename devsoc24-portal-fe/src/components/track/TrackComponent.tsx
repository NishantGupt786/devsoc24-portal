/* eslint-disable react/jsx-key */
import React from "react";
import TrackCard from "./TrackCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const tracks = [
  {
    imgsrc: "/images/1-interactive-engagement.svg",
    name: "Interactive Engagement",
    title: "Interactive Engagement (Gamified Solutions)",
    description: `This track is all about engaging applications with gamified mechanisms. Create solutions which promote enhanced interaction and user-retention with the help of immersive technologies and reward systems.`,
  },
  {
    imgsrc: "/images/2-eco-innovations.svg",
    name: "Eco-Innovations",
    title: "Eco-Innovations (Sustainable Technology)",
    description: `Technology is all about problem solving and enriching the life of users. Provide technical solutions which promote sustainability and a better environment. Improve the current technologies to make them more sustainable or develop brand new solutions.`,
  },
  {
    imgsrc: "/images/3-community-building.svg",
    name: "Community Building",
    title: "Community Building",
    description: `This track focuses on fostering stronger, more connected communities. Participants are tasked with creating platforms or tools that promote unity and communal engagement.`,
  },
  {
    imgsrc: "/images/4-future-work.svg",
    name: "Future of Work",
    title: "Future of Work",
    description: `This track explores the evolving nature of work in the digital era. Participants are encouraged to develop solutions that enhance productivity and redefine traditional work models. Participants can also build solutions that fine-tune LLMs or use vector databases to change the work landscape.`,
  },
  {
    imgsrc: "/images/5-ethical-tech.svg",
    name: "Ethical Technology",
    title: "Ethical Technology",
    description: `This track focuses on developing solutions promoting responsible innovation, privacy, fairness, and transparency in the tech industry. Participants are tasked with addressing societal concerns such as data privacy and security. Participants can also focus on combating unethical use of tech and emphasise integrity and accountability in technology design and deployment.`,
  },
  {
    imgsrc: "/images/6-open-innovation.svg",
    name: "Open Innovation",
    title: "Open Innovation",
    description: `This track focuses on embracing creativity to solve diverse challenges. Participants are encouraged to explore groundbreaking ideas across sectors and implement interdisciplinary approaches and collaborative problem-solving. If you have any idea that doesn’t fit in any of the other tracks, this track is for you.`,
  },
];
const TrackComponent = () => {
  return (
    <div className="trackComponent h-fit w-full rounded-xl bg-white px-6 md:w-[32vw] lg:h-[51vh] lg:overflow-auto">
      <div className="pt-3 font-semibold text-[#45464E]">Track Details</div>
      <div className="my-6 flex w-full flex-col items-center gap-y-6 -z-10">
        {tracks.map((item, index) => (
          <Dialog>
            <DialogTrigger key={index} className="w-full">
              <TrackCard imagesrc={item.imgsrc} name={item.name} key={index} />
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>{item.title}</DialogTitle>
              <DialogDescription>{item.description}</DialogDescription>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default TrackComponent;
