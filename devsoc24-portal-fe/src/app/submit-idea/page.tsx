"use client";

import Image from "next/image";
import Logo from "@/components/logo";
import Dashtitle from "@/assets/images/titleDashboard.svg";
import SubmitIdeaForm from "./submit-idea-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [screenWidth, setScreenWidth] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {/* OG CODE */}
      {!screenWidth ? (
        <>
          <main className="flex h-[200%] flex-col items-start overflow-x-hidden bg-[#F4F5FA] min-[931px]:h-[100vh] min-[931px]:min-h-screen">
            <div className="flex w-full flex-row gap-4 bg-white lg:gap-8">
              <Logo className="h-9/10 w-auto scale-[0.75] lg:scale-[1] " />
              <Image
                src={Dashtitle as HTMLImageElement}
                alt="title"
                className="w-[30vw] lg:w-auto"
              />
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
      ) : (
        <>

            <div className="flex flex-col bg-">
              <div className="flex h-[8vh] w-full flex-row justify-center gap-4 bg-white  px-6 lg:gap-8">
                <Link href="/home" className="fixed left-10 self-center">
                  <ArrowLeft className="text-[#0019FF]" />
                </Link>
                <div className="flex flex-row items-center">
                  <Logo className="h-9/10 w-auto scale-[0.75] lg:scale-[1] " />
                  <Image
                    src={Dashtitle as HTMLImageElement}
                    alt="title"
                    className="w-[30vw] lg:w-auto"
                  />
                </div>
              </div>
              <div className="">
                <p className="m-4 mb-4 text-center text-4xl font-medium text-black md:my-12">
                  Idea Submission For Devsoc24
                </p>
                <div className="flex w-full items-center justify-center ">
                  <SubmitIdeaForm />
                </div>
              </div>
            </div>
        </>
      )}

      {/* I Like this one */}
    </>
  );
}
