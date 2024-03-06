"use client"

import Image from "next/image";
import Logo from "@/components/logo";
import Dashtitle from "@/assets/images/titleDashboard.svg";
import active from "@/assets/images/active.svg"
import SubmitIdeaForm from "./submit-idea-form";

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col h-[100vh] items-start bg-[#F4F5FA] overflow-x-hidden">
            <div className="flex h-[10%] w-full items-center gap-x-8 bg-background px-3 py-2">
                <Logo className="h-9/10 w-auto" />
                <Image src={Dashtitle as HTMLImageElement} alt="title" />
            </div>
            <div className="flex h-[100vh] w-[4.7rem] items-start justify-center  gap-x-8 bg-background px-6 py-2 pt-12">
                <Image src={active as HTMLImageElement} alt="title" className="scale-150" />
            </div>
            <div className="pt-[8.7vh] pl-[4.7rem] absolute mt-5 ml-5">
                <p className="text-black text-4xl font-medium ">Submit An Idea For Devsoc24</p>
                <SubmitIdeaForm />
            </div>


        </main>
    )
}