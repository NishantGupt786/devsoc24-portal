"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Logo from "@/components/logo";
import Dashtitle from "@/assets/images/titleDashboard.svg";
import CustomCard from "@/components/customCard";
import TeamCard from "@/components/teamCard";

export default function HomePage() {
  const noTeamCard = [
    {
      text: "+ Create Team",
      showModal: true,
      modalType: "CreateTeam",
    },
    {
      text: "Join Team",
      showModal: true,
      modalType: "JoinTeam",
    },
  ];
  const ideaCard = [
    {
      text: "View Idea",
      showModal: true,
      modalType: "IdeaSubmit",
    },
    {
      text: "Submit Idea",
      showModal: false,
      routeTo: "/submit-idea",
    },
  ];
  const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     router.push("./login");
  //   } else {
  //     router.push("./signup");
  //   }
  // });
  return (
    <main className="flex min-h-screen flex-col items-start overflow-x-hidden bg-[#F4F5FA]">
      <div className="flex h-[10%] w-full items-center gap-x-8 bg-background px-6 py-2">
        <Logo className="h-9/10 w-auto" />
        <Image src={Dashtitle as HTMLImageElement} alt="title" />
      </div>
      <div className="mt-4 flex w-full flex-col gap-4 px-4 md:flex-row md:flex-wrap">
        <CustomCard
          title="Your Devsoc Team"
          cardImage="teamCardImg"
          cardContent="No Team Members Yet?"
          cardDesc="Start A New Team or Join One"
          buttonDetails={noTeamCard}
        />
        <CustomCard
          title="Idea Submission"
          cardImage="ideaSubmissionImg"
          cardContent="No Idea Submitted yet"
          cardDesc="Submit Your Idea Before < date > < time >"
          buttonDetails={ideaCard}
        />
        <TeamCard />
      </div>
    </main>
  );
}
