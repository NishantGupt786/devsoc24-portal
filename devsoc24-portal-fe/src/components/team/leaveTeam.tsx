import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import {
  useTeamStore,
  useUserStore,
  useIdeaStore,
  useTeamEditStore,
  useLeaderStore,
} from "@/store/store";
import axios from "axios";
import toast from "react-hot-toast";
import { userProps } from "@/interfaces";
import router from "next/navigation";
import { useRouter } from "next/navigation";

const LeaveTeam = () => {
  const { team, setTeam } = useTeamStore();
  const { user, setUser } = useUserStore();

  const router = useRouter();

  const fetchTeam = async () => {
    try {
      const response = await axios.get<userProps>(
        `${process.env.NEXT_PUBLIC_API_URL}/team`,
        {
          withCredentials: true,
        },
      );
      setUser(response.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 401:
            void router.push("/");
            break;
          case 404:
            console.log("Idea Not found, but in a team");
            break;
          case 409:
            console.log("Not in team");
            break;
          default:
            console.log(e);
            break;
        }
      }
    }
  };

  const leaveTeam = async () => {
    const handleClick = async () => {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/team/leave`, {
        withCredentials: true,
      });
    };

    void toast.promise(handleClick(), {
      loading: "Loading...",
      success: (temp) => {
        setTeam(true);
        void fetchTeam();
        return `Accepted`;
      },
      error: `Something went wrong`,
    });
  };
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Are you sure you want to leave the team?</DialogTitle>
      </DialogHeader>
      <div className="flex justify-center">
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild onClick={fetchTeam}>
            <Button type="submit" className="bg-[#458B71]" onClick={leaveTeam}>
              Yes
            </Button>
          </DialogClose>
        </DialogFooter>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild onClick={fetchTeam}>
            <Button type="submit" className="bg-[#458B71]">
              No
            </Button>
          </DialogClose>
        </DialogFooter>
      </div>
    </DialogContent>
  );
};

export default LeaveTeam;
