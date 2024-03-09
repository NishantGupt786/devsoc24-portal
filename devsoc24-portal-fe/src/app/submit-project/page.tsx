"use client"

import Image from "next/image";
import Logo from "@/components/logo";
import Dashtitle from "@/assets/images/titleDashboard.svg";
import active from "@/assets/images/active.svg"
import SubmitProjectForm from "./submit-project-form";
import { ArrowLeft } from 'lucide-react';
import Link from "next/link";

export default function Page() {
    return (
        <main className="flex min-[931px]:min-h-screen flex-col min-[931px]:h-[100vh] h-[200%] items-start bg-[#F4F5FA] overflow-x-hidden">
            <div className="flex h-[10%] w-full items-center gap-x-8 bg-background px-3 py-2">
                <Logo className="h-9/10 w-auto" />
                <Image src={Dashtitle as HTMLImageElement} alt="title" />
            </div>
            <div className="flex h-[100vh] w-[4.7rem] max-[445px]:w-[3.7rem] items-start justify-center  gap-x-8 bg-background px-6 py-2 pt-12">
                <Link href="/"><ArrowLeft className="text-[#0019FF]" /></Link>
            </div>
            <div className="mt-[11vh] ml-[4.7rem] max-[445px]:ml-[3.7rem] absolute pt-5 pl-5 bg-[#F4F5FA] w-[91.9vw] flex flex-col max-[931px]:justify-center  ">
                <p className="text-black text-4xl font-medium mb-4">Project Submission For Devsoc24</p>
                <SubmitProjectForm />
            </div>
        </main>
    )
}