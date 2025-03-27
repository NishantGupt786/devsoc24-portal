"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/components/logo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import title from "@/assets/images/title.svg";
import title2 from "@/assets/images/glitchtitle1.svg";
import title3 from "@/assets/images/glitchtitle2.svg";
import title4 from "@/assets/images/glitchtitle3.svg";
import ForgotForm from "./forgot-pass-form";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[url('/images/bg.svg')] bg-cover bg-no-repeat">
      <div className="flex h-[10%] w-full items-center justify-between bg-background px-6 py-2">
        <Logo className="h-9/10 w-auto" />
      </div>
      <div className="flex max-w-[90vw] grow items-center justify-center">
        <Card className="w-fit">
          <CardHeader className="items-center">
            <div className="flex items-center justify-center text-7xl font-black">
              Internal Hack &apos;25
            </div>
          </CardHeader>
          <div className="mt-3 flex flex-col items-center">
            <p className="text-2xl font-semibold text-black">Welcome back!</p>
            <p className="mt-1 text-sm">Reset Password</p>
          </div>
          <CardContent className="mt-4">
            <ForgotForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
