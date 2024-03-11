"use client";
import { useEffect, useState } from "react";
import { Crown, BadgeMinus, Files, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { teamDataProps, userProps } from "@/interfaces";
import axios, { AxiosResponse } from "axios";
import { useIdeaStore, useTeamStore, useUserStore } from "@/store/store";
import { useRouter } from "next/navigation";

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
      fetchTeam();
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

  return (
    <>
      <div>
        <div className="h-fit w-full rounded-xl bg-white md:w-[32vw]">
          <div className="pl-6 pt-4 font-semibold text-[#45464E]">
            Your Devsoc Team
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
