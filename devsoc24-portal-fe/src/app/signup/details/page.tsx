"use client";

import Logo from "@/components/logo";
import Image, { type StaticImageData } from "next/image";
import React, { useState } from "react";
import details1 from "@/assets/images/details1.svg";
import details2 from "@/assets/images/details2.svg";
import details3 from "@/assets/images/details3.svg";
import PersonalDetails from "./personal-details-form";
import CollegeDetailsForm from "./college-details-form";
import { AlertTriangle, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiscordIcon } from "@/assets/images/discord";
import TeamDetailsForm from "./team-form";

export default function Page() {
  const [form, setForm] = useState(0);
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  return (
    <main className="flex min-h-screen flex-col items-center bg-[url('/images/bg.svg')] bg-cover bg-no-repeat">
      <div className="flex h-[10%] w-full items-center justify-between bg-background px-6 py-2">
        <Logo className="h-9/10 w-auto" />
      </div>
      <div className="flex w-full grow flex-col items-center bg-white/30 pt-10">
        <Image
          src={
            form === 0
              ? (details1 as StaticImageData)
              : form === 1
                ? (details2 as StaticImageData)
                : (details3 as StaticImageData)
          }
          alt=""
          height={100}
          width={100}
          className="h-auto w-1/2 md:w-1/6"
        />
        <p className="mt-4 text-center text-2xl font-medium text-black">
          {form === 0 && "Let's Start with Some Basic Questions"}
          {form === 1 && "College Related Questions"}
          {form === 2 && "Team Formation"}
        </p>
        {form === 0 && <PersonalDetails setForm={setForm} />}
        {form === 1 && <CollegeDetailsForm setForm={setForm} />}
        {form === 2 && <TeamDetailsForm />}
      </div>
    </main>
  );
}
