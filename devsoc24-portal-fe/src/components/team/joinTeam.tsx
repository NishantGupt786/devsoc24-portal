import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import axios, { AxiosResponse } from "axios";
import { useIdeaStore, useTeamDataStore, useTeamStore, useUserStore } from "@/store/store";
import { userProps } from "@/interfaces";
import { useRouter } from "next/navigation";
import { APIResponse } from "@/schemas/api";

function JoinTeam() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { team, setTeam } = useTeamStore();
  const { idea, setIdea } = useIdeaStore();
  const { user, setUser } = useUserStore();
  const { teamData, setTeamData } = useTeamDataStore();

  const router = useRouter();
  const handleClick = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/team/join`,
        {
          code: inputRef.current?.value,
        },
        {
          withCredentials: true,
        },
      );
      void fetchTeam();
      setTeam(false);
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
        switch (e.response?.status) {
          case 401:
            void router.push("/");
            break;
          case 417:
            setTeam(true);
            console.log("no team");
            break;
          case 200:
            setTeam(true);
            break;
          default:
            console.log(e);
            break;
        }
      }
    }
  };
  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join a team</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-2 py-4">
          <Label htmlFor="name" className="text-sm font-normal text-[#53545C]">
            Enter Team Code
          </Label>
          <Input
            id="name"
            placeholder="Team code"
            className="col-span-3"
            ref={inputRef}
          />
        </div>
        <div className="flex justify-center">
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild onClick={fetchTeam}>
              <Button
                type="submit"
                className="bg-[#458B71]"
                onClick={handleClick}
              >
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </>
  );
}

export default JoinTeam;
