import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios, { AxiosResponse } from "axios";
import z from "zod";

const teamNameSchema = z.object({
  name: z.string(),
});

function CreateTeam() {
  const createTeam = async () => {
    try {
      const response: AxiosResponse<{ name: string }> = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/team/create`,
        {
          name: "",
        },
        {
          withCredentials: true,
        },
      );
      console.log(response);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 201:
            console.log("Created");
          case 409:
            console.log("Not in team");
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
          <DialogTitle>Create a team</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-2 py-4">
          <Label htmlFor="name" className="text-sm font-normal text-[#53545C]">
            Enter team name
          </Label>
          <Input id="name" placeholder="Team name" className="col-span-3" />
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="bg-[#458B71]">
            Confirm
          </Button>
        </div>
      </DialogContent>
    </>
  );
}

export default CreateTeam;
