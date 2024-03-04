"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import CreateTeamForm from "@/components/forms/create-team-form";
import JoinTeamForm from "@/components/forms/join-team-form";
import { Button } from "@/components/ui/button";

export default function TeamDetailsForm({
  setForm,
}: {
  setForm: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isNewTeam, setisNewTeam] = useState(false);

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col items-center pt-5">
        <p className="text-center text-base font-semibold text-primary">
          Create a New Team?
        </p>
        <div className="flex items-center space-x-2 pt-2">
          <Switch
            id="isNewTeam"
            checked={isNewTeam}
            onCheckedChange={() => setisNewTeam((prev) => !prev)}
          />
          <Label htmlFor="isNewTeam">{isNewTeam ? "Yes" : "No"}</Label>
        </div>
        <p className="pt-2 text-base font-medium text-muted-foreground">
          {isNewTeam
            ? "Team Leader Makes The New Team!"
            : "Join An Existing Team!"}
        </p>
      </div>
      {isNewTeam ? <CreateTeamForm /> : <JoinTeamForm />}
      <Button className="mx-auto mt-10 w-fit">Skip</Button>
      <p className="text-muted-primary mx-auto pt-2">
        You can join / create a team later!
      </p>
    </div>
  );
}
