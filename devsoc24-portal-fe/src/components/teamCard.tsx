import { useEffect, useState } from "react";
import { Crown, BadgeMinus, Files, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { teamDataProps } from "@/interfaces";

import {
  useLeaderStore,
  useTeamEditStore,
  showModalStore,
  showkickStore,
} from "@/store/store";
import editImg from "@/assets/images/edit.svg";
import Image from "next/image";

const TeamCard: React.FC<teamDataProps> = (props) => {
  const [isCopied, setIsCopied] = useState(false);
  const [Leader, setLeader] = useState("");
  const { edit, setEdit } = useTeamEditStore();
  const { isLeader, setIsLeader } = useLeaderStore();
  const { showModal, setShowModal } = showModalStore();
  const { kickMate, setKickMate } = showkickStore();

  const handleDialogTriggerClick = (modalType: string) => {
    setShowModal(modalType);
  };

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
      // console.log("NAME:", leader.name);
      setLeader(leader.name);
    }
  }, [props.team]);
  const toggleEdit = () => {
    // console.log("EDIT:", edit);
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
              <div onClick={() => handleDialogTriggerClick("leave")}>
                <div className="mx-2 flex flex-row items-center justify-between gap-3 rounded-lg border-2 border-[#AD1136] px-2 py-1 text-[#AD1136] transition-all duration-150 ease-in-out hover:cursor-pointer hover:bg-black/10">
                  <Image
                    src={editImg as HTMLImageElement}
                    alt="edit"
                    height={0}
                    width={0}
                    className="h-fit w-fit"
                  />
                  Leave Team
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center justify-center p-8">
            <p className="text-2xl font-semibold">{props.team?.team_name}</p>
            <p className="pb-4 text-sm text-[#8B8D97]">Team Members</p>
            <div className="mb-2 flex w-full items-center justify-between rounded-lg border-2 border-[#B6B6B6] p-3">
              <span>{Leader}</span>
              <span className="text-[#FFBE3D]">
                <Crown />
              </span>
            </div>
            {props.team?.users
              .filter((member) => member.name !== Leader)
              .map((member, index) => (
                <div
                  key={index}
                  className="mb-2 flex w-full items-center justify-between rounded-lg border-2 border-[#B6B6B6] p-3"
                >
                  <span>{member.name}</span>

                  <div
                    onClick={() => {
                      handleDialogTriggerClick("kick");
                      setKickMate(member.id);
                    }}
                  >
                    <span className="text-[#AD1136] hover:scale-[1.05] hover:cursor-pointer">
                      {edit ? <BadgeMinus /> : <></>}
                    </span>
                  </div>
                </div>
              ))}
            <div className="flex w-full flex-row items-center justify-evenly ">
              {props.team && (
                <CopyToClipboard
                  text={props.team?.team_code}
                  onCopy={onCopyText}
                >
                  <Button className="mt-4 flex items-center gap-x-2 self-center">
                    <span className="text-white">
                      {isCopied ? <Check size={20} /> : <Files size={20} />}
                    </span>
                    {props.team?.team_code}
                  </Button>
                </CopyToClipboard>
              )}
              {edit ? (
                <>
                  <div
                    onClick={() => {
                      handleDialogTriggerClick("leave");
                      // console.log("MODAL: ", showModal);
                    }}
                  >
                    <Button className="mt-4 flex items-center gap-x-2 self-center bg-[#AD1136] hover:bg-[#AD1136]/80">
                      Delete Team
                    </Button>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamCard;
