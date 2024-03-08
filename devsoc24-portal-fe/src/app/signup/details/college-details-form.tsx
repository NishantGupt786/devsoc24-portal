"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import VitianForm from "../../../components/forms/vitian-form";
import ExternalForm from "../../../components/forms/external-form";

export default function CollegeDetailsForm({
  setForm,
}: {
  setForm: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isVitian, setIsVitian] = useState(false);

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col items-center pt-5">
        <p className="text-center text-base font-semibold text-primary">
          Are You From Vellore Institute Of Technology, Vellore?
        </p>
        <div className="flex items-center space-x-2 pt-2">
          <Switch
            id="isVitian"
            checked={isVitian}
            onCheckedChange={() => setIsVitian((prev) => !prev)}
          />
          <Label htmlFor="isVitian">{isVitian ? "Yes" : "No"}</Label>
        </div>
        <p className="pt-2 text-base font-medium text-muted-foreground">
          {isVitian
            ? "VIT Vellore Students Only"
            : "External Students and Participants Only"}
        </p>
      </div>
      {isVitian ? <VitianForm setForm={setForm} /> : <ExternalForm setForm={setForm}/>}
    </div>
  );
}
