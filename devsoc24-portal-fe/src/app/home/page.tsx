"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/logo";
import Dashtitle from "@/assets/images/titleDashboard.svg";
import CustomCard from "@/components/customCard";
import TeamCard from "@/components/teamCard";
import contentstack from "@/assets/images/contentstack.svg";
import axios, { AxiosError, type AxiosResponse } from "axios";

import {
  useIdeaStore,
  useLeaderStore,
  useTeamDataStore,
  useTeamStore,
  useUserStore,
  showModalStore,
  IdeaStore,
} from "@/store/store";
import TrackComponent from "@/components/track/TrackComponent";
import toast from "react-hot-toast";
import { refresh, type userProps } from "@/interfaces";
import { type APIResponse } from "@/schemas/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, User, X, XIcon } from "lucide-react";
import ToastContainer from "@/components/ToastContainer";
import Link from "next/link";
import TimelineComponent from "@/components/timeline/timelineComponent";
import LeaveTeam from "@/components/team/leaveTeam";
import Kick from "@/components/team/kick";
import { Button } from "@/components/ui/button";
import { DiscordIcon } from "@/assets/images/discord";

interface ideaProps {
  message: string;
  status: string;
  data?: {
    title: string;
    description: string;
    track: string;
    github_link: string;
    figma_link: string;
    others: string;
  };
}

export default function HomePage() {
  const router = useRouter();
  const { idea, setIdea } = useIdeaStore();
  const { team, setTeam } = useTeamStore();
  const { user, setUser } = useUserStore();
  const { getIdea, SetIdea } = IdeaStore();
  const { teamData, setTeamData } = useTeamDataStore();
  const { isLeader, setIsLeader } = useLeaderStore();
  const { showModal, setShowModal } = showModalStore();
  const [selected, setSelected] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [gender, setGender] = useState("");

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/logout`,
        {
          nallaData: "",
        },
        {
          withCredentials: true,
        },
      );
      localStorage.clear();
      void router.push("/");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 401:
            await refresh();
            // console.log("401");
            break;
          default:
            // console.log(e);
            break;
        }
      }
    }
  };

  const handleLogout = async () => {
    void toast.promise(logout(), {
      loading: "Logging out...",
      success: "Logged out successfully!",
      error: "Something went wrong!",
    });
    void router.push("/");
  };

  const fetchData = async () => {
    try {
      const response: AxiosResponse<userProps> = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
        {
          withCredentials: true,
        },
      );
      // console.log(response.data.data.is_leader);
      setIsLeader(response.data.data.is_leader);
      setGender(response.data.data.gender);
      // console.log(isLeader);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 401:
            void router.push("/");
            break;
          case 404:
            // console.log("no team");
            break;
          case 409:
            // console.log("Not in team");
            break;
          default:
            toast.error("Something went wrong"); //I just hope this works, check karlo bhay
            // console.log(e);
            break;
        }
      }
    }
  };

  const fetchIdea = async () => {
    try {
      const response: AxiosResponse<ideaProps> = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/project`,
        {
          withCredentials: true,
        },
      );
      if (response.data.status === "success") {
        setShowBanner(true);
        // setShowNotice(true);
        setSelected(true);
        SetIdea("idea found");
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError<APIResponse>;
        switch (axiosError.response?.status) {
          case 401:
            router.push("/");
            break;
          case 404:
            SetIdea("");
            break;
          case 417:
            // console.log("team no idea");
            break;
          case 409:
            setIdea(409);
            break;
          default:
            // console.log(e);
            break;
        }
      }
    }
  };

  const fetchBanner = async () => {
    try {
      const response: AxiosResponse<ideaProps> = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/idea`,
        {
          withCredentials: true,
        },
      );
      if (response.data.status === "success") {
        setShowBanner(true);
        // setShowNotice(true);
        setSelected(true);
        SetIdea("idea found");
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError<APIResponse>;
        switch (axiosError.response?.status) {
          case 401:
            router.push("/");
            break;
          case 404:
            SetIdea("");
            break;
          case 417:
            // console.log("team no idea");
            break;
          case 409:
            setIdea(409);
            break;
          default:
            // console.log(e);
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
        const axiosError = e as AxiosError<APIResponse>;
        switch (axiosError.response?.status) {
          case 401:
            void router.push("/");
            break;
          case 502:
            void router.push("/");
            break;
          case 404:
            if (axiosError.response?.data.message === "user does not exist") {
              router.push("/");
            }
            break;
          case 417:
            setTeam(true);
            break;
          default:
            // console.log(e);
            break;
        }
      }
    }
  };

  useEffect(() => {
    const fetchDataAndLogin = async () => {
      // await login();
      await fetchData();
    };
    void fetchDataAndLogin();
  }, []);

  useEffect(() => {
    if (user.data.team_id === "00000000-0000-0000-0000-000000000000") {
      // console.log("Loner saala");
      setTeam(true);
    } else {
      void fetchIdea();
      void fetchTeam();
      void fetchBanner();
    }
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
  const ideaTherecard = [
    {
      text: "View Project",
      showModal: true,
      modalType: "IdeaSubmit",
    },
    {
      text: "Edit Project",
      showModal: false,
      modalType: "EditIdea",
      routeTo: "/edit-project",
    },
  ];
  const ideaCard = [
    {
      text: "Submit A Project",
      showModal: getIdea !== "idea found" && getIdea !== "",
      modalType: "Choice",
      routeTo: "/submit-project",
    },
  ];

  const notLeader = [
    {
      text: "View Project",
      showModal: true,
      modalType: "IdeaSubmit",
    },
  ];
  const ideaView = [
    {
      text: "View Idea",
      showModal: true,
      modalType: "IdeaView",
    },
  ];

  return (
    <>
      {showNotice ? (
        <>
          <div className="fixed z-[100] flex h-screen w-screen items-center justify-center bg-black/50">
            <div className="flex w-[90vw] flex-col rounded-xl bg-white p-4 lg:w-[50vw]">
              <div className="flex h-fit w-full items-center justify-between text-lg">
                <p>Notice</p>
                <X
                  className="mb-5 h-4 w-4 text-black hover:cursor-pointer"
                  onClick={() => setShowNotice(false)}
                />
              </div>
              {gender === "Male" ? (
                <div>
                  All boys are to report before 8:30 PM. You have to give your
                  biometric attendance at Anna Auditorium.
                </div>
              ) : gender === "Female" ? (
                <div>
                  Girls are to give attendance at their respective hostels
                  blocks by 8:45 PM and report to Anna Auditorium.
                </div>
              ) : (
                <>
                  <ul className="m-4 list-disc">
                    <li>
                      All boys are to report before 8:30 PM. You have to give
                      your biometric attendance at Anna Auditorium.
                    </li>
                    <li>
                      Girls are to give attendance at their respective hostels
                      blocks by 8:45 PM and report to Anna Auditorium.
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <ToastContainer />
      <main className="max-w-screen flex h-fit flex-col items-center overflow-x-hidden bg-[#F4F5FA] lg:h-screen">
        <div className="flex h-fit min-h-[8vh] w-full items-center justify-between gap-x-8 bg-background  px-2 py-2 lg:px-6">
          <div className="flex flex-row gap-4 lg:gap-8">
            <Logo className="h-9/10 b flex w-auto scale-[0.75] lg:scale-[1]" />
            <Image
              src={Dashtitle as HTMLImageElement}
              alt="title"
              className="hidden w-[30vw] sm:block lg:w-auto"
            />
          </div>
          <div className="flex flex-row gap-8">
            <Link href="https://www.contentstack.com/">
              <Image
                src={contentstack as HTMLImageElement}
                alt="titlesponsor"
                width={200}
                className="scale-[1.2]"
              />
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="mr-2 lg:mr-10">
                {/* This bkl is causing Hydration Error */}
                {/* <Button variant="ghost" size="icon">
                <User />
              </Button> */}

                <div>
                  <User />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href="/profile">
                  <DropdownMenuLabel className="cursor-pointer">
                    Profile
                  </DropdownMenuLabel>
                </Link>
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
        </div>
        {showBanner ? (
          <>
            <div className="flex w-full items-center justify-between bg-[#0019FF] p-2">
              <div className="flex grow flex-col items-center justify-between gap-2 md:flex-row">
                <div className="flex items-center">
                  {selected ? (
                    <>
                      <Check className="h-8 w-8 text-white" />
                      <p className="pl-2 text-xl text-white">
                        Congratulations! Your idea has been shortlisted for
                        round 2. Report to Anna Auditorium before 11:45 AM.
                      </p>
                    </>
                  ) : (
                    <>
                      <X className="h-8 w-8 text-white" />
                      <p className="pl-2 text-xl text-white">
                        We regret to inform you that your idea has not been
                        shortlisted for the next round. Please check your mail
                        for further information.
                      </p>
                    </>
                  )}
                </div>
              </div>
              <XIcon
                size={24}
                className="cursor-pointer text-white"
                onClick={() => setShowBanner(false)}
              />
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="flex h-full flex-col">
          {showModal === "leave" && <LeaveTeam />}
          {showModal === "kick" && <Kick />}
          <div className="mt-4 flex h-fit w-screen flex-col justify-between gap-4 px-4">
            <TimelineComponent count={7} />
          </div>

          <div className="mt-4 flex h-fit w-screen flex-col justify-between gap-4 px-4 md:flex-row lg:h-[85%]">
            {team ? (
              <CustomCard
                title="Your Team"
                cardImage="user"
                cardContent="No Team Members Yet?"
                cardDesc="Start A New Team or Join One"
                buttonDetails={noTeamCard}
              />
            ) : (
              <TeamCard {...teamData} />
            )}
            <div className="flex flex-col gap-y-4 ">
              <CustomCard
                title="Project Submission"
                cardImage="ideaSubmissionImg"
                cardContent={
                  getIdea === "idea found"
                    ? "Project Submitted"
                    : "No Project Yet"
                }
                cardDesc={
                  getIdea === "idea found"
                    ? isLeader
                      ? "Edit or View Project"
                      : "View Project"
                    : isLeader
                      ? "Submit a Project"
                      : "View Project"
                }
                buttonDetails={
                  getIdea === "idea found" && !team
                    ? isLeader
                      ? ideaTherecard
                      : notLeader
                    : ideaCard
                }
              />
              <CustomCard
                title="Idea Submission"
                cardImage="ideaSubmissionImg"
                cardContent="Idea Submitted"
                cardDesc="View Idea"
                buttonDetails={ideaView}
              />
            </div>

            <div className="h-full ">
              <TrackComponent />
            </div>

            {/* <div className="flex max-h-full flex-col rounded-xl">
              <Sponsors />
              <div className="flex flex-grow overflow-auto ">
                <TrackComponent />
              </div>
            </div> */}
          </div>
        </div>
      </main>
    </>
  );
}
