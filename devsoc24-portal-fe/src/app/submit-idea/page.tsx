"use client";

import Image from "next/image";
import Logo from "@/components/logo";
import Dashtitle from "@/assets/images/titleDashboard.svg";
import toast, { Toaster } from 'react-hot-toast';

import SubmitIdeaForm from "./submit-idea-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <main className="flex h-[200%] flex-col items-start overflow-x-hidden bg-[#F4F5FA] min-[931px]:h-[100vh] min-[931px]:min-h-screen">
        <div className="flex h-[10%] w-full items-center gap-x-8 bg-background px-3 py-2">
          <Logo className="h-9/10 w-auto" />
          <Image src={Dashtitle as HTMLImageElement} alt="title" />
        </div>
        <div className="flex h-[100vh] w-[4.7rem] items-start justify-center gap-x-8  bg-background px-6 py-2 pt-12 max-[445px]:w-[3.7rem]">
          <Link href="/home">
            <ArrowLeft className="text-[#0019FF]" />
          </Link>
        </div>
        <div className="absolute ml-[4.7rem] mt-[11vh] flex w-[91.9vw] flex-col bg-[#F4F5FA] pl-5 pt-5 max-[931px]:justify-center max-[445px]:ml-[3.7rem]  ">
          <p className="mb-4 text-4xl font-medium text-black">
            Idea Submission For Devsoc24
          </p>
          <SubmitIdeaForm />
        </div>
      </main>
    </>
  );
}
