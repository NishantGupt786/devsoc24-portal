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
import axios, { AxiosResponse } from "axios";
import z from "zod";
import { useRef } from "react";
import { useIdeaStore, useTeamStore, useUserStore } from "@/store/store";
import { userProps } from "@/interfaces";
import { useRouter } from "next/navigation";

const teamNameSchema = z.object({
  name: z.string(),
});

function CreateTeam() {
  const { team, setTeam } = useTeamStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const { user, setUser } = useUserStore();
  const { idea, setIdea } = useIdeaStore();

  const router = useRouter();
  const handleClick = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/team/create`,
        {
          name: inputRef.current?.value,
        },
        {
          withCredentials: true,
        },
      );

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
  const fetchData = async () => {
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
            setIdea(409);
            console.log("Not in team");
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
          <DialogTitle>Create a team</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-2 py-4">
          <Label htmlFor="name" className="text-sm font-normal text-[#53545C]">
            Enter team name
          </Label>
          <Input
            id="name"
            placeholder="Team name"
            className="col-span-3"
            ref={inputRef}
          />
        </div>
        <div className="flex justify-center">
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild onClick={fetchData}>
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

export default CreateTeam;
