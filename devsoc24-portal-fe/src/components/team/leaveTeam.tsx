import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";

const LeaveTeam = () => {
  return (
    <div>
      <Dialog>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a team</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-y-2 py-4">
            <Label
              htmlFor="name"
              className="text-sm font-normal text-[#53545C]"
            >
              Are you sure you want to leave the team?
            </Label>
          </div>
          <div className="flex justify-center">
            <DialogFooter className="sm:justify-start">
              <DialogClose>
                <Button
                  type="submit"
                  className="bg-[#458B71]"
                  // onClick={async () => {}}
                >
                  Yes
                </Button>
                <Button
                  type="submit"
                  className="bg-[#458B71]"
                  // onClick={async () => {}}
                >
                  No
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeaveTeam;
