"use client";

import Image from "next/image";
import Logo from "@/components/logo";
import Dashtitle from "@/assets/images/titleDashboard.svg";
import cclogo from "@/assets/images/cclogo.svg";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import contentstack from "@/assets/images/contentstack.svg";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { refresh } from "@/interfaces";
import axios from "axios";
import Profile from "./profile-form";
import refreshToken from "@/services/refreshtoken";

export default function Page() {
  const [screenWidth, setScreenWidth] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = async () => {
    void toast.promise(logout(), {
      loading: "Logging out...",
      success: "Logged out successfully!",
      error: "Something went wrong!",
    });
    void router.push("/");
  };

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/logout`,
        {
          nallaData: "",
        },
        {
          withCredentials: true,
        },
      );
      localStorage.clear();
      void router.push("/");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 401:
            await refresh();
            // console.log("401");
            break;
          default:
            // console.log(e);
            break;
        }
      }
    }
  };

  return (
    <>
      {/* OG CODE */}
      {!screenWidth ? (
        <>
          <main className="flex h-[200%] flex-col items-start overflow-x-hidden bg-[#F4F5FA] min-[931px]:h-[100vh] min-[931px]:min-h-screen">
            <div className="flex w-full flex-row gap-4 bg-white lg:gap-8">
              <Logo className="h-9/10 ml-3 w-auto scale-[0.75] lg:scale-[1]" />
            </div>
            <div className="flex h-[100vh] w-[4.7rem] items-start justify-center gap-x-8  bg-background px-6 py-2 pt-12 max-[445px]:w-[3.7rem]">
              <Link href="/home">
                <ArrowLeft className="text-[#0019FF]" />
              </Link>
            </div>
            <div className="absolute ml-[4.7rem] mt-[11vh] flex w-[91.9vw] flex-col bg-[#F4F5FA] pl-5 pt-5 max-[931px]:justify-center max-[445px]:ml-[3.7rem]  ">
              <p className="mb-4 text-4xl font-medium text-black">Profile</p>

              <Profile />
            </div>
          </main>
        </>
      ) : (
        <>
          <div className="bg- flex flex-col">
            <div className="flex h-fit min-h-[8vh] w-full items-center justify-between gap-x-8 bg-background  px-2 py-2 lg:px-6">
              <div className="flex flex-row gap-4 lg:gap-8">
                <div className=" my-auto scale-125">
                  <Link href="/home">
                    <ArrowLeft className="text-[#0019FF]" />
                  </Link>
                </div>
                <Logo className="h-9/10 b flex w-auto scale-[0.75] lg:scale-[1]" />
              </div>
              <div className="mr-10 flex flex-row gap-8">
                <Link href="https://www.contentstack.com/">
                  <Image
                    src={contentstack as HTMLImageElement}
                    alt="titlesponsor"
                    width={200}
                    className="scale-[1.2]"
                  />
                </Link>
              </div>
            </div>
            <div className="">
              <p className="m-4 mb-4 text-center text-4xl font-medium text-black md:my-12">
                Profile
              </p>
              <div className="flex w-full items-center justify-center ">
                <Profile />
              </div>
            </div>
          </div>
        </>
      )}

      {/* I Like this one */}
    </>
  );
}
