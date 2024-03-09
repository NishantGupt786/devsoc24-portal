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
    const refresh = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
          {
            nallaData: "",
          },
          {
            withCredentials: true,
          },
        );
      } catch (e) {
        if (axios.isAxiosError(e)) {
          switch (e.response?.status) {
            case 401:
              try {
                await refresh();
              } catch (e) {
                console.log("REFESH: ", e);
              }
            default:
              console.log(e);
          }
        }
      }
    };
    setInterval(() => {
      void refresh();
    }, 270000);
  }, []);

  return (
    <html lang="en">
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
