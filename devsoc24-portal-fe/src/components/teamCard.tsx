"use client";
import { useState } from "react";
import { Crown, BadgeMinus, Files, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyToClipboard } from "react-copy-to-clipboard";

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

const TeamCard: React.FC<teamDataProps> = (props) => {
  const [isCopied, setIsCopied] = useState(false);
  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  return (
    <>
      <div>
        <div className="h-fit w-full rounded-xl bg-white md:w-[32vw]">
          <div className="pl-3 pt-2 font-semibold text-[#45464E]">
            Your Devsoc Team
          </div>
          <div className="flex flex-col items-center justify-center p-8">
            <p className="text-2xl font-semibold">{props.team?.team_name}</p>
            <p className="pb-4 text-sm text-[#8B8D97]">Team Members</p>
            <div className="mb-2 flex w-full items-center justify-between rounded-lg border-2 border-[#B6B6B6] p-3">
              {props.team?.users[0]?.name}
              {/* {team.isLeader && (
                <span className="text-[#FFBE3D]">
                  <Crown />
                </span>
              )} */}
            </div>
            {props.team?.users.map((member, index) => (
              <div
                key={index}
                className="mb-2 flex w-full items-center justify-between rounded-lg border-2 border-[#B6B6B6] p-3"
              >
                <span>{member.name}</span>
                {/* {member.isLeader ? (
                  <span className="text-[#FFBE3D]">
                    <Crown />
                  </span>
                ) : (
                  <span className="text-[#AD1136]">
                    <BadgeMinus />
                  </span>
                )} */}
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
