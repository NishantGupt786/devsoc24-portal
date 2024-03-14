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
import axios, { AxiosError } from "axios";
import {
  useTeamDataStore,
  useTeamStore,
  IdeaStore,
  useLeaderStore,
  useTeamEditStore,
} from "@/store/store";
import { useRouter } from "next/navigation";
import { type APIResponse } from "@/schemas/api";
import toast from "react-hot-toast";

function JoinTeam() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { team, setTeam } = useTeamStore();
  const { teamData, setTeamData } = useTeamDataStore();
  const { isLeader, setIsLeader } = useLeaderStore();
  const { getIdea, SetIdea } = IdeaStore();
  const { edit, setEdit } = useTeamEditStore();
  const router = useRouter();
  const handleClick = async () => {
    if (!inputRef.current?.value || inputRef.current?.value.length === 0) {
      toast.error("Please enter a team code!");
      return;
    }
    const handleSubmit = async () => {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/team/join`,
        {
          code: inputRef.current?.value,
        },
        {
          withCredentials: true,
        },
      );
      void fetchTeam();
      setEdit(false);
      SetIdea("idea found");
      setIsLeader(false);
      setTeam(false);
    };
    void toast.promise(handleSubmit(), {
      loading: "Cooking...",
      success: () => {
        void router.push("/home");
        return `Team joined successfully!`;
      },
      error: (err: AxiosError) => {
        switch (err.response?.status) {
          case 404:
            return `Account not found!`;
          case 417:
            return `User is already in a team!`;
          case 409:
            return `Invalid Team Code!`;
          case 424:
            return `Team is full!`;
          case 400:
            return `Please check your input and try again!`;
          default:
            return `Something went wrong!`;
        }
      },
    });
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
            // console.log("no team");
            break;
          case 200:
            setTeam(true);
            break;
          default:
            // console.log(e);
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
            maxLength={6}
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
