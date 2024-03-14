"use client";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import { useEffect } from "react";
import axios from "axios";

const inter = Poppins({
  subsets: ["latin"],
  weight: "200",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Ensure useEffect runs only on the client side
    if (typeof window !== "undefined") {
      const interval = setInterval(() => {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
            {
              nallaData: "",
            },
            {
              withCredentials: true,
            },
          )
          .then((res) => {
            // console.log(res);
          })
          .catch((e) => {
            // console.log(e);
          });
      }, 270000);

      // Clean up interval on component unmount
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>DEVSOC&apos;24 | Portal</title>
        <meta title="DEVSOC'24 | Portal"></meta>
        <meta
          name="description"
          content={
            "Welcome to the DEVSOC-24 Portal! From idea submission to your final project, the portal is your guide for DEVSOC. Happy Hacking!"
          }
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon.ico"
        ></link>

        {/* Open Graph tags */}
        <meta property="og:title" content={"DEVSOC'24 | Portal"} />
        <meta
          property="og:description"
          content={
            "Welcome to the DEVSOC-24 Portal! From idea submission to your final project, the portal is your guide for DEVSOC. Happy Hacking!"
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={"/thumbnail.png"} />
        <meta property="og:url" content={""} />
        <meta property="og:site_name" content={"DEVSOC'24 | Portal"} />
      </head>
      <body className={`font-sans ${inter.className}`}>
        <div className="flex h-auto w-[100%] items-center justify-center bg-[#2463EB] font-bold">
          *For Internal Testing Purposes Only*
        </div>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
