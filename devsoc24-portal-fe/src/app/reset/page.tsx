"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/components/logo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import title from "@/assets/images/title.svg";
import title2 from "@/assets/images/glitchtitle1.svg";
import title3 from "@/assets/images/glitchtitle2.svg";
import title4 from "@/assets/images/glitchtitle3.svg";
import ResetForm from "./reset-form";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { APIResponse } from "@/schemas/api";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const resendOTP = async () => {
    const handleResentOTP = async () => {
      await axios.post<APIResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/resend`,
        {
          email: email,
          type: "verification",
        },
        {
          withCredentials: true,
        },
      );
    };

    void toast.promise(handleResentOTP(), {
      loading: "Loading...",
      success: () => {
        return `OTP Sent`;
      },
      error: (err: AxiosError) => {
        switch (err.response?.status) {
          case 404:
            return `Account Not Found`;
          case 409:
            return `Incorrect Credentials`;
          case 403:
            return `User Already Verified`;
          case 400:
            return `Please check your input and try again`;
          default:
            return `Something went wrong`;
        }
      },
    });
  };

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
            <p className="text-2xl font-semibold text-black">Reset Password</p>
            <p className="mt-1 text-sm">Login to your account</p>
          </div>
          <CardContent className="mt-4">
            <ResetForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
