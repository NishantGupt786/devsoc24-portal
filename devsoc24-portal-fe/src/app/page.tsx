"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("./login");
    } else {
      router.push("./signup");
    }
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[url('/images/bg.svg')] bg-cover bg-no-repeat"></main>
  );
}
