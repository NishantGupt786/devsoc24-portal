"use client";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { type CardProps } from "@/interfaces";
import JoinTeam from "@/components/team/joinTeam";
import IdeaSubmission from "@/components/submission/submission";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateTeam from "./team/createTeam";
import Choice from "./team/Option";
import { useRouter } from "next/navigation";

function CustomCard(props: CardProps) {
  const router = useRouter();
  const { title, cardImage, cardContent, cardDesc, buttonDetails } = props;
  const [showModal, setShowModal] = useState("");

  const handleDialogTriggerClick = (modalType: string) => {
    setShowModal(modalType);
  };

  return (
    <>
      <div className="h-fit w-full rounded-xl bg-white md:w-[32vw]">
        <div className="pl-6 pt-4 font-semibold text-[#45464E]">{title}</div>
        <div className="flex flex-col items-center justify-center p-8">
          <div className="rounded-full border-[#E1E2E9] bg-[#F4F5FA] p-8">
            <Image
              src={`/images/${cardImage}.svg`}
              width={50}
              height={50}
              alt="card"
            />
          </div>
          <div className="p-8 text-center">
            <p className="text-2xl font-semibold">{cardContent}</p>
            <p className="text-sm text-[#8B8D97]">{cardDesc}</p>
          </div>
          <div className="flex justify-center gap-x-4">
            <Dialog>
              {buttonDetails.map((button, index) =>
                button.showModal ? (
                  <DialogTrigger
                    key={index}
                    className="w-36 rounded-md bg-primary p-2 text-white"
                    onClick={() => {
                      handleDialogTriggerClick(button.modalType!);
                    }}
                  >
                    {button.text}
                  </DialogTrigger>
                ) : (
                  <Button
                    key={index}
                    className="w-36"
                    onClick={() => void router.push(button.routeTo ?? "")}
                  >
                    {button.text}
                  </Button>
                ),
              )}
              {showModal === "Choice" && <Choice />}
              {showModal === "JoinTeam" && <JoinTeam />}
              {showModal === "CreateTeam" && <CreateTeam />}
              {showModal === "IdeaSubmit" && <IdeaSubmission />}
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomCard;
