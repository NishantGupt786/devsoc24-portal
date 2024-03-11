"use client";

import { verifyOTPSchema } from "@/schemas/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyRoundIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios, { type AxiosError } from "axios";
import { type APIResponse } from "@/schemas/api";
import { BadRequest, ServerError } from "@/components/toast";
import { secondsToHms } from "@/lib/utils";
import ToastContainer from "@/components/ToastContainer";

type VerifyFormValues = z.infer<typeof verifyOTPSchema>;

export default function ForgotForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [timer, setTimer] = useState(0);

  const form = useForm<VerifyFormValues>({
    resolver: zodResolver(verifyOTPSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: VerifyFormValues) {
    console.log(data);
    const handleSubmit = async () => {
      const res = await axios.post<APIResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/verify`,
        {
          email: email,
          otp: data.otp,
        },
        {
          withCredentials: true,
        },
      );
    };
    void toast.promise(handleSubmit(), {
      loading: "Loading...",
      success: (temp) => {
        return `Success`;
      },
      error: (err: AxiosError) => {
        switch (err.response?.status) {
          case 404:
            return `Account Not Found`;
          case 401:
            return `Invalid OTP!\nPlease enter a valid OTP`;
          case 409:
            return `Incorrect Credentials`;
          case 403:
            return `OTP Expired!\nPlease resend OTP`;
          case 400:
            return `Please check your input and try again`;
          default:
            return `Something went wrong`;
        }
      },
    });
    setTimeout(() => {
      toast.dismiss();
    }, 1000);
    setTimeout(() => {
      router.push(`/signup/verify?email=${email}`);
    }, 1500);
  }

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
      success: (temp) => {
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

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    }
  }, [timer]);

  return (
    <>
      <ToastContainer />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 py-4"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Username</FormLabel> */}
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="OTP"
                      autoComplete="otp"
                      maxLength={6}
                      {...field}
                      className={`h-14 bg-gray-100 pl-10 text-lg tracking-wider ${
                        form.getFieldState("otp").invalid
                          ? "border-red-500 focus:border-input focus:!ring-red-500"
                          : ""
                      }`}
                    />
                    <KeyRoundIcon
                      color="gray"
                      className="absolute left-2 top-1/2 -translate-y-1/2"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="text-center text-sm text-muted-foreground">
            Haven&apos;t received OTP?{" "}
            {timer <= 0 ? (
              <span
                onClick={resendOTP}
                className="cursor-pointer font-medium text-primary hover:underline"
              >
                Resend
              </span>
            ) : (
              <span className="font-medium">
                Resend in {secondsToHms(timer)}
              </span>
            )}
          </p>

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="mx-auto mt-4 w-fit px-14"
          >
            {form.formState.isSubmitting ? "Verifying OTP..." : "Verify OTP"}
          </Button>
        </form>
      </Form>
    </>
  );
}
