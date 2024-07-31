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

  return (
    <html lang="en">
      <head>
        <title>Internal Hack&apos;24 | Portal</title>
        <meta title="Internal Hack'24 | Portal"></meta>
        <meta
          name="description"
          content={
            "Welcome to the Internal Hack-24 Portal! From idea submission to your final project, the portal is your guide for Internal Hack. Happy Hacking!"
          }
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon.ico"
        ></link>

        {/* Open Graph tags */}
        <meta property="og:title" content={"Internal Hack'24 | Portal"} />
        <meta
          property="og:description"
          content={
            "Welcome to the Internal Hack-24 Portal! From idea submission to your final project, the portal is your guide for Internal Hack. Happy Hacking!"
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={"https://portal.devsoc.codechefvit.com/thumbnail.png"} />
        <meta property="og:url" content={"https://portal.devsoc.codechefvit.com"} />
        <meta property="og:image:alt" content={"DEVSOC'24 | Portal"} />
        <meta property="og:site_name" content={"DEVSOC'24 | Portal"} />
      </head>
      <body className={`font-sans ${inter.className}`}>
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
