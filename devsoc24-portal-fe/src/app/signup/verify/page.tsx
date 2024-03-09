"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/components/logo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import title from "@/assets/images/title.svg";
import title2 from "@/assets/images/glitchtitle1.svg";
import title3 from "@/assets/images/glitchtitle2.svg";
import title4 from "@/assets/images/glitchtitle3.svg";
import VerifyForm from "./verify-form";

export default function Page() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
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

  return (
    <main className="flex min-h-screen flex-col items-center bg-[url('/images/bg.svg')] bg-cover bg-no-repeat">
      <div className="flex h-[10%] w-full items-center justify-between bg-background px-6 py-2">
        <Logo className="h-9/10 w-auto" />
      </div>
      <div className="flex max-w-[90vw] grow items-center justify-center">
        <Card className="w-fit">
          <CardHeader className="items-center">
            <Image src={titles[currentTitleIndex] as string} alt="title" />
          </CardHeader>
          <div className="mt-3 flex flex-col items-center">
            <p className="text-2xl font-semibold text-black">
              DEVSOC&apos;24 Time Baby!
            </p>
            <p className="mt-1 text-sm">Start hack-a-lacking!</p>
          </div>
          <CardContent className="mt-4">
            <VerifyForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
