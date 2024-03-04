import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function JoinTeam() {
  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join a team</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-2 py-4">
          <Label htmlFor="name" className="text-sm font-normal text-[#53545C]">
            Enter team code
          </Label>
          <Input id="name" placeholder="Team code" className="col-span-3" />
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

export default JoinTeam;
