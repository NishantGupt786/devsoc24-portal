"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Logo from "@/components/logo";
import Dashtitle from "@/assets/images/titleDashboard.svg";
import CustomCard from "@/components/customCard";
import TeamCard from "@/components/teamCard";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  useIdeaStore,
  useTeamStore,
  useUserStore,
  userProps,
} from "@/store/store";
import Loading from "./loading";
import TrackComponent from "@/components/track/TrackComponent";

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

interface teamDataUserProps {
  name: string;
  reg_no: string;
  email: string;
}

interface teamDataProps {
  message?: string;
  status?: string;
  team?: {
    team_name: string;
    team_code: string;
    leaderid: string;
    round: 0;
    users: teamDataUserProps[];
    idea: {
      title: string;
      description: string;
      track: string;
      github_link: string;
      figma_link: string;
      others: string;
    };
    project: {
      name: string;
      description: string;
      track: string;
      github_link: string;
      figma_link: string;
      others: string;
    };
  };
}

export default function HomePage() {
  const { idea, setIdea } = useIdeaStore();
  const { team, setTeam } = useTeamStore();
  const { user, setUser } = useUserStore();
  const [teamData, setTeamData] = useState<teamDataProps | null>(null);

  // const login = async () => {
  //   const response = await axios.post(
  //     `${process.env.NEXT_PUBLIC_API_URL}/login`,
  //     {
  //       email: "abhinav@gmail.com",
  //       password: "123456",
  //     },
  //     {
  //       withCredentials: true,
  //     },
  //   );
  // };

  const fetchData = async () => {
    try {
      const response: AxiosResponse<userProps> = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
        {
          withCredentials: true,
        },
      );
      setUser(response.data);
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
  };

  const fetchTeam = async () => {
    try {
      const response: AxiosResponse<teamDataProps> = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/team`,
        {
          withCredentials: true,
        },
      );
      setTeamData(response.data);
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

  const fetchIdea = async () => {
    try {
      const response: AxiosResponse<ideaProps> = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/idea`,
        {
          withCredentials: true,
        },
      );
      console.log("FETCH IDEA: ", response);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 404:
            console.log("no team");
          case 417:
            console.log("team no idea");
          default:
            console.log(e);
        }
      }
    }
  };

  useEffect(() => {
    const fetchDataAndLogin = async () => {
      // await login();
      await fetchData();
      await fetchIdea();
    };
    void fetchDataAndLogin();
  }, []);

  useEffect(() => {
    if (user.data.team_id === "00000000-0000-0000-0000-000000000000") {
      console.log("Loner saala");
      setTeam(true);
    } else {
      void fetchTeam();
    }
  }, [user]);

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

  return (
    <main className="flex h-fit lg:h-screen flex-col items-start overflow-y-auto overflow-x-hidden bg-[#F4F5FA]">
      <div className="flex h-[10%] w-full items-center gap-x-8 bg-background px-6 py-2">
        <Logo className="h-9/10 w-auto" />
        <Image src={Dashtitle as HTMLImageElement} alt="title" />
      </div>
      <div className="mt-4 flex h-fit w-full flex-col justify-evenly gap-4 overflow-y-auto px-4 md:flex-row lg:h-[85%]">
        {team ? (
          <CustomCard
            title="Your Devsoc Team"
            cardImage="teamCardImg"
            cardContent="No Team Members Yet?"
            cardDesc="Start A New Team or Join One"
            buttonDetails={noTeamCard}
          />
        ) : (
          <TeamCard {...teamData} />
        )}
        <CustomCard
          title="Idea Submission"
          cardImage="ideaSubmissionImg"
          cardContent="No Idea Submitted yet"
          cardDesc="Submit Your Idea Before < date > <div time >"
          buttonDetails={ideaCard}
        />
        <TrackComponent />
      </div>
    </main>
  );
}
