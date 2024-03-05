"use client";
import { useState } from "react";
import { Crown, BadgeMinus, Files, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyToClipboard } from "react-copy-to-clipboard";
const team = {
  memberName: "John dobecrazy",
  teamName: "Team valhalla",
  isLeader: true,
  teamMembers: [
    { name: "John doe", isLeader: false },
    { name: "John doe", isLeader: false },
    { name: "John doe", isLeader: false },
  ],
  teamCode: "123456",
};

function TeamCard() {
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
        <div className="h-fit w-full rounded-xl bg-white md:w-[400px]">
          <div className="pl-3 pt-2 font-semibold text-[#45464E]">
            Your Devsoc Team
          </div>
          <div className="flex flex-col items-center justify-center p-8">
            <p className="text-2xl font-semibold">{team.teamName}</p>
            <p className="pb-4 text-sm text-[#8B8D97]">Team Members</p>
            <div className="mb-2 flex w-full items-center justify-between rounded-lg border-2 border-[#B6B6B6] p-3">
              {team.memberName}
              {team.isLeader && (
                <span className="text-[#FFBE3D]">
                  <Crown />
                </span>
              )}
            </div>
            {team.teamMembers.map((member, index) => (
              <div
                key={index}
                className="mb-2 flex w-full items-center justify-between rounded-lg border-2 border-[#B6B6B6] p-3"
              >
                <span>{member.name}</span>
                {member.isLeader ? (
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
            <CopyToClipboard text={team.teamCode} onCopy={onCopyText}>
              <Button className="mt-4 self-center flex items-center gap-x-2">
                <span className="text-white">{isCopied ? <Check size={20} /> : <Files size={20} />}</span>
                {team.teamCode}
              </Button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeamCard;
