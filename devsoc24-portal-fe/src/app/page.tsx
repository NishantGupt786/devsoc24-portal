"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Logo from "@/components/logo";
import Dashtitle from "@/assets/images/titleDashboard.svg";
import CustomCard from "@/components/customCard";
import TeamCard from "@/components/teamCard";
import axios, { type AxiosResponse } from "axios";
import {
  useIdeaStore,
  useTeamDataStore,
  useTeamStore,
  useUserStore,
} from "@/store/store";
import Loading from "./loading";
import TrackComponent from "@/components/track/TrackComponent";
import { ToastContainer, toast } from "react-toastify";
import { refresh, type userProps } from "@/interfaces";
import { type APIResponse } from "@/schemas/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

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
  const { user, setUser } = useUserStore();
  const { teamData, setTeamData } = useTeamDataStore();
  

  const handleLogout = async () => {
    const toastId = toast.loading("Loading...", { autoClose: false });
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/logout`,
        {
          nallaData: "",
        },
        {
          withCredentials: true,
        },
      );

      localStorage.clear();
      toast.update(toastId, {
        render: (
          <div className="">
            <h2 className="font-semibold">Logged Out successfully!</h2>
            <p>Redirecting...</p>
          </div>
        ),
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      router.push("/login");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 401:
            await refresh();
            console.log("401");
            break;
          default:
            console.log(e);
            break;
        }
      }
    }
  };

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
          case 401:
            router.push("/login");
            break;
          case 404:
            console.log("Idea Not found, but in a team");
            break;
          case 409:
            setIdea(409);
            console.log("Not in team");
            break;
          default:
            console.log(e);
            break;
        }
      }
    }
  };

  const fetchTeam = async () => {
    try {
      const response = await axios.get<APIResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/team`,
        {
          withCredentials: true,
        },
      );
      setTeamData(response.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 401:
            router.push("/login");
            break;
          case 417:
            setTeam(true);
            console.log("no team");
            break;
          case 200:
            setTeam(true);
            break;
          default:
            console.log(e);
            break;
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
          case 401:
            router.push("/login");
            break;
          case 404:
            console.log("no team");
            break;
          case 417:
            console.log("team no idea");
            break;
          default:
            console.log(e);
            break;
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
      modalType: idea === 409 ? "Choice" : "JoinTeam",
      routeTo: "/submit-idea",
    },
  ];
  const router = useRouter();

  return (
    <>
      <ToastContainer />
      <main className="flex h-fit flex-col items-start overflow-y-auto overflow-x-hidden bg-[#F4F5FA] lg:h-screen">
        <div className="flex h-[10%] w-full items-center justify-between gap-x-8 bg-background px-6 py-2">
          <div className="flex flex-row gap-8">
            <Logo className="h-9/10 w-auto" />
            <Image src={Dashtitle as HTMLImageElement} alt="title" />
          </div>
          {/* <Image
            src={logout as HTMLImageElement}
            alt="logout"
            height={0}
            width={0}
            className="h-[50px] w-[50px] hover:cursor-pointer"
            onClick={handleLogout}
          /> */}
          <DropdownMenu>
            <DropdownMenuTrigger className="mr-10">
              <Button variant="ghost" size="icon">
                <User />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="cursor-pointer">
                Profile
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel
                className="cursor-pointer text-red-500"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
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
    </>
  );
}
