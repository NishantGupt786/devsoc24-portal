"use client";
import React, { useEffect, useState } from "react";
import Logo from "@/components/logo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import title from "@/assets/images/title.svg";
import title2 from "@/assets/images/glitchtitle1.svg";
import title3 from "@/assets/images/glitchtitle2.svg";
import title4 from "@/assets/images/glitchtitle3.svg";
import LoginForm from "./login-form";
import { Dialog } from "@radix-ui/react-dialog";
import { LucideXSquare } from "lucide-react";

export default function Page() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const titles = [title, title2, title3, title4];

  useEffect(() => {
    const intervals = [2000, 400, 600, 400];

    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, intervals[currentTitleIndex]);

    return () => {
      clearInterval(interval);
    };
  }, [currentTitleIndex, titles.length]);

  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 1000);
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-[url('/images/bg.svg')] bg-cover bg-no-repeat">
      {showModal ? (
        <>
          <div className="fixed left-0 top-0 z-[100] flex h-screen w-screen items-center justify-center bg-black/40">
            <div className="relative flex h-fit min-h-[100px] w-fit min-w-[200px] flex-col rounded-lg bg-white ">
              <div className="flex w-full rounded-t-lg bg-black/30 px-2">
                <div className="absolute right-2 top-1 " onClick={toggleModal}>
                  <LucideXSquare color="black" opacity={60} className="" />
                </div>
                <div className="p-1">Notice</div>
              </div>
              <div className="h-full w-full break-words p-3">
                This Website is under developement and is in internal testing
                phase only
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="flex h-[10%] w-full items-center justify-between bg-background px-6 py-2">
        <Logo className="h-9/10 w-auto" />
      </div>
      <div className="flex max-w-[90vw] grow items-center justify-center">
        <Card className="w-fit">
          <CardHeader className="items-center">
            <Image
              src={titles[currentTitleIndex] as string}
              alt="title"
              priority
            />
          </CardHeader>
          <div className="mt-3 flex flex-col items-center">
            <p className="text-2xl font-semibold text-black">Welcome back!</p>
            <p className="mt-1 text-sm">Login to your account</p>
          </div>
          <CardContent className="mt-4">
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
