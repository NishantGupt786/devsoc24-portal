import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import axios from "axios";

function JoinTeam() {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/idea`,

        {
          code: inputRef.current?.value,
        },
        {
          withCredentials: true,
        },
      );
    } catch (e) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 409:
            console.log("Already has Idea");
          case 202:
            console.log("Accepted");
          default:
            console.log(e);
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
          <Button type="submit" className="bg-[#458B71]" onClick={handleClick}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </>
  );
}

export default JoinTeam;
