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
import axios, { AxiosError } from "axios";
import { useRef } from "react";
import {
  useTeamDataStore,
  useTeamStore,
} from "@/store/store";
import { useRouter } from "next/navigation";
import { APIResponse } from "@/schemas/api";
import toast from "react-hot-toast";

function CreateTeam() {
  const { team, setTeam } = useTeamStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const { teamData, setTeamData } = useTeamDataStore();

  const router = useRouter();
  const handleClick = async () => {
 await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/team/create`,
      {
        name: inputRef.current?.value,
      },
      {
        withCredentials: true,
      },
    );
  };

  void toast.promise(handleClick(), {
    loading: "Cooking...",
    success: () => {
      setTeam(false);
      void fetchTeam();
      return `Team created successfully!`;
    },
    error: (err: AxiosError) => {
      // console.log("ERR", err);
      switch (err.response?.status) {
        case 404:
          return `Account not found!`;
        case 409:
          return `Incorrect credentials`;
        case 400:
          return `Please check your input and try again!`;
        default:
          return `Something went wrong!`;
      }
    },
  });
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
            placeholder="Team Name"
            className="col-span-3"
            ref={inputRef}
          />
        </div>
        <div className="flex justify-center">
          <DialogFooter className="sm:justify-start">
            <DialogClose>
              <Button
                className="bg-[#458B71]"
                onClick={async () => {
                  await handleClick();
                  await fetchTeam();
                }}
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
