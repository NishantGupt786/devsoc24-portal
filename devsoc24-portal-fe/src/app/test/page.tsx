"use client"
import TimelineComponent from "@/components/timeline/timelineComponent";
import TrackComponent from "@/components/track/TrackComponent";
import React from "react";

const Page = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <TimelineComponent count={5} />
    </div>
  );
};

export default Page;
