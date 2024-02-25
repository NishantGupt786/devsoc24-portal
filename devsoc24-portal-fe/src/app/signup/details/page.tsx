"use client";
import Logo from "@/components/logo";
import { ModeToggle } from "@/components/theme-toggle";
import Image, { type StaticImageData } from "next/image";
import React from "react";
import details1 from "@/assets/images/details1.svg";
import Detail1Form from "./details1-form";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[url('/images/bg.svg')] bg-cover bg-no-repeat">
      <div className="flex h-[10%] w-full items-center justify-between bg-background px-6 py-2">
        <Logo className="h-9/10 w-auto" />
        <ModeToggle />
      </div>
      <div className="flex w-full grow flex-col items-center bg-white/30 pt-10">
        <Image
          src={details1 as StaticImageData}
          alt=""
          height={100}
          width={100}
          className="h-auto w-1/6"
        />
        <p className="mt-4 text-2xl font-medium text-black">
          Let&apos;s Start with Some Basic Questions
        </p>
        <Detail1Form />
      </div>
    </main>
  );
}
