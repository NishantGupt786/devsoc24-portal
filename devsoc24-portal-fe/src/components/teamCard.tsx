"use client";
import { useEffect, useState } from "react";
import { Crown, BadgeMinus, Files, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { teamDataProps, userProps } from "@/interfaces";
import axios, { AxiosResponse } from "axios";
import {
  useIdeaStore,
  useLeaderStore,
  useTeamEditStore,
  useTeamStore,
  useUserStore,
} from "@/store/store";
import { useRouter } from "next/navigation";
import editImg from "@/assets/images/edit.svg";
import Image from "next/image";

interface keyProps {
  message: string;
  status: string;
  team: teamDataProps;
}

const TeamCard: React.FC<teamDataProps> = (props) => {
  const [isCopied, setIsCopied] = useState(false);
  const [Leader, setLeader] = useState("");
  const { team, setTeam } = useTeamStore();
  const { user, setUser } = useUserStore();
  const { idea, setIdea } = useIdeaStore();
  const { edit, setEdit } = useTeamEditStore();
  const { isLeader, setIsLeader } = useLeaderStore();

  const router = useRouter();

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const fetchTeam = async () => {
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
            void router.push("/login");
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
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/team/leave`,
        {
          withCredentials: true,
        },
      );
      setTeam(false);
      void fetchTeam();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 202:
            console.log("Accepted");
          default:
            console.log(e);
        }
      }
    }
  };

  useEffect(() => {
    const leader = props.team?.users.find(
      (item) => item.id === props.team?.leader_id,
    );
    if (leader) {
      setLeader(leader.name);
    }
  }, [props.team]);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  return (
    <>
      <div>
        <div className="h-fit w-full rounded-xl bg-white md:w-[32vw]">
          <div className="flex w-full items-center justify-between pl-6 pt-4 font-semibold text-[#45464E]">
            <p>Your Devsoc Team</p>
            {isLeader ? (
              <div
                className="mx-2 flex flex-row items-center justify-between gap-3 rounded-lg border-2 border-[#53545C] px-2 py-1 transition-all duration-150 ease-in-out hover:cursor-pointer hover:bg-black/10"
                onClick={toggleEdit}
              >
                <Image
                  src={editImg as HTMLImageElement}
                  alt="edit"
                  height={0}
                  width={0}
                  className="h-fit w-fit"
                />
                Edit
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col items-center justify-center p-8">
            <p className="text-2xl font-semibold">{props.team?.team_name}</p>
            <p className="pb-4 text-sm text-[#8B8D97]">Team Members</p>
            {props.team?.users.map((member, index) => (
              <div
                key={index}
                className="mb-2 flex w-full items-center justify-between rounded-lg border-2 border-[#B6B6B6] p-3"
              >
                <span>{member.name}</span>
                {member.name === Leader ? (
                  <span className="text-[#FFBE3D]">
                    <Crown />
                  </span>
                ) : member.id === user.data.id ? (
                  <span
                    className="text-[#AD1136] hover:scale-[1.05] hover:cursor-pointer"
                    onClick={leaveTeam}
                  >
                    <BadgeMinus />
                  </span>
                ) : (
                  <></>
                )}
              </div>
            ))}
            {props.team && (
              <CopyToClipboard text={props.team?.team_code} onCopy={onCopyText}>
                <Button className="mt-4 flex items-center gap-x-2 self-center">
                  <span className="text-white">
                    {isCopied ? <Check size={20} /> : <Files size={20} />}
                  </span>
                  {props.team?.team_code}
                </Button>
              </CopyToClipboard>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamCard;
