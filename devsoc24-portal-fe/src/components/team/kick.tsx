import React from "react";
import { type APIResponse } from "@/schemas/api";
import {
  showModalStore,
  showkickStore,
  useTeamDataStore,
} from "@/store/store";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Kick = () => {
  const { showModal, setShowModal } = showModalStore();
  const { kickMate, setKickMate } = showkickStore();
  const { teamData, setTeamData } = useTeamDataStore();

  const router = useRouter();

  const fetchTeam = async () => {
    try {
      // console.log("fetch team");
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
            void router.push("/");
            break;
          case 502:
            void router.push("/");
            break;
          case 404:
            // console.log("Idea Not found, but in a team");
            break;
          case 409:
            // console.log("Not in team");
            break;
          default:
            // console.log(e);
            break;
        }
      }
    }
  };

  const leaveTeam = async () => {
    const handleClick = async () => {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/team/kick`,
        { id: kickMate },
        {
          withCredentials: true,
        },
      );
      setShowModal("");
    };

    await toast.promise(handleClick(), {
      loading: "Loading...",
      success: () => {
        return `Kicked`;
      },
      error: `Something went wrong`,
    });
    await fetchTeam();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-sm backdrop-brightness-50 backdrop-filter">
      <div className="rounded-lg bg-white p-8">
        <button
          className="absolute right-0 top-0 p-2 text-gray-500"
          onClick={() => setShowModal("")}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-xl font-semibold text-gray-800">
          Are you sure you want to kick your team mate?
        </h2>
        <div className="mt-4 flex justify-center">
          <button
            onClick={leaveTeam}
            className="mr-4 rounded-md bg-[#458B71] px-4 py-2 text-white"
          >
            Yes
          </button>
          <button
            onClick={() => setShowModal("")}
            className="rounded-md bg-[#458B71] px-4 py-2 text-white"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Kick;
