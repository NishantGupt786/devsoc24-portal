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
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRef, useState } from "react";
import {
  useTeamDataStore,
  useTeamStore,
  useIdeaStore,
  useLeaderStore,
  IdeaStore,
} from "@/store/store";
import { useRouter } from "next/navigation";
import { APIResponse } from "@/schemas/api";
import toast from "react-hot-toast";
import refreshToken from "@/services/refreshtoken";

interface ideaProps {
  message: string;
  status: boolean;
  data?: {
    title: string;
    description: string;
    track: string;
    github_link: string;
    figma_link: string;
    others: string;
  };
}

function CreateTeam() {
  const { team, setTeam } = useTeamStore();
  const [teamName, setTeamName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { teamData, setTeamData } = useTeamDataStore();
  const { idea, setIdea } = useIdeaStore();
  const { isLeader, setIsLeader } = useLeaderStore();
  const { getIdea, SetIdea } = IdeaStore();

  const router = useRouter();

  const handleClick = async () => {
    if (!inputRef.current?.value || inputRef.current?.value.trim().length === 0) {
      toast.error("Please enter a team name!");
      return;
    }
    if (inputRef.current?.value.length >= 20) {
      toast.error("Team name should not be more than 20 characters!");
      return;
    }
    try {
      await refreshToken()
      console.log("name", teamName);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/team/create`,
        { name: teamName },
        {
          withCredentials: true,
        },
      );

      setIsLeader(true);
      SetIdea("");
      setIdea(409);
      setTeam(false);
      await fetchTeam();
      toast.success("Team created successfully!");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.response?.status) {
          case 404:
            toast.error("Account not found!");
            break;
          case 401:
            router.push("/");
            break;
          case 409:
            toast.error("Team name already exists!");
            break;
          case 400:
            toast.error("Please check your input and try again!");
            break;
          default:
            toast.error("Something went wrong!");
            break;
        }
      }
    }
  };

  const fetchTeam = async () => {
    try {
      await refreshToken()
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
            router.push("/");
            break;
          case 502:
            router.push("/");
            break;
          case 417:
            setTeam(false);
            break;
          default:
            console.error(e);
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
            placeholder="Team Name"
            className="col-span-3"
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <DialogFooter className="sm:justify-start">
            <DialogClose>
              <Button className="bg-[#458B71]" onClick={handleClick}>
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
