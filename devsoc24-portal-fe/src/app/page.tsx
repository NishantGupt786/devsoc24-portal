"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import Logo from "@/components/logo";
import Dashtitle from "@/assets/images/titleDashboard.svg";
import CustomCard from "@/components/customCard";
import TeamCard from "@/components/teamCard";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useIdeaStore, useTeamStore } from "@/store/store";
import Loading from "./loading";

interface ideaProps {
  message: string;
  status: boolean;
  data?: {
    title: string;
    description: string;
    track: string;
    github_link: string;
    figma_link: string;
    others: string;
  };
}

interface teamProps {
  data: {
    token_expired?: boolean;
  };
  message: string;
  status: string;
}

export default function HomePage() {
  const { idea, setIdea } = useIdeaStore();
  const { team, setTeam } = useTeamStore();
  const login = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      {
        email: "abhinav@gmail.com",
        password: "123456",
      },
      {
        withCredentials: true,
      },
    );
  };

  const fetchData = async () => {
    try {
      const response: AxiosResponse<ideaProps> = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/idea`,
        {
          withCredentials: true,
        },
      );
      console.log(response);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 404:
            console.log("Idea Not found, but in a team");
          case 409:
            setIdea(409);
            console.log("Not in team");
          default:
            console.log(e);
        }
      }
    }
    //Team Get
    try {
      const response: AxiosResponse<teamProps> = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/team`,
        {
          withCredentials: true,
        },
      );
      console.log(response);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 417:
            setTeam(false);
            console.log("no team");
          case 200:
            setTeam(true);
          default:
            console.log(e);
        }
      }
    }
  };

  useEffect(() => {
    const fetchDataAndLogin = async () => {
      await login();
      await fetchData();
    };
    void fetchDataAndLogin();
  }, []);

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
      text: "Submit An Idea",
      showModal: true,
      modalType: idea === 409 ? "Choice" : "IdeaSubmit",
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
    <Suspense fallback={<Loading />}>
      <main className="flex min-h-screen flex-col items-start overflow-x-hidden bg-[#F4F5FA]">
        <div className="flex h-[10%] w-full items-center gap-x-8 bg-background px-6 py-2">
          <Logo className="h-9/10 w-auto" />
          <Image src={Dashtitle as HTMLImageElement} alt="title" />
        </div>
        <div className="mt-4 flex w-full flex-col gap-4 px-4 md:flex-row md:flex-wrap">
          {team ? (
            <CustomCard
              title="Your Devsoc Team"
              cardImage="teamCardImg"
              cardContent="No Team Members Yet?"
              cardDesc="Start A New Team or Join One"
              buttonDetails={noTeamCard}
            />
          ) : (
            <TeamCard />
          )}
          <CustomCard
            title="Idea Submission"
            cardImage="ideaSubmissionImg"
            cardContent="No Idea Submitted yet"
            cardDesc="Submit Your Idea Before < date > <div time >"
            buttonDetails={ideaCard}
          />
        </div>
      </main>
    </Suspense>
  );
}
