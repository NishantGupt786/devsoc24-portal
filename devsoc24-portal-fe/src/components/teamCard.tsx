"use client";
import { useEffect, useState } from "react";
import { Crown, BadgeMinus, Files, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { teamDataProps } from "@/interfaces";

interface keyProps {
  message: string;
  status: string;
  team: teamDataProps;
}

const TeamCard: React.FC<teamDataProps> = (props) => {
  const [isCopied, setIsCopied] = useState(false);
  const [Leader, setLeader] = useState("");
  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
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
                ) : (
                  <span className="text-[#AD1136]">
                    <BadgeMinus />
                  </span>
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
