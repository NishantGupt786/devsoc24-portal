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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios, { type AxiosError } from "axios";
import { type APIResponse } from "@/schemas/api";
import { BadRequest, ServerError } from "@/components/toast";
import { secondsToHms } from "@/lib/utils";

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
    const toastId = toast.loading("Verifying OTP...", {
      autoClose: false,
    });

    try {
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
      toast.update(toastId, {
        render: (
          <div className="">
            <h2 className="font-semibold">
              {res.status === 200
                ? "Account verified successfully!"
                : "User already verified!"}
            </h2>
            <p>
              {res.status === 200
                ? "Please complete profile."
                : "Please login."}
            </p>
          </div>
        ),
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setTimeout(() => {
        void router.push("/login");
      }, 1500);
      return;
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        if (error.response?.status === 404) {
          toast.update(toastId, {
            render: (
              <div className="">
                <h2 className="font-semibold">No account found!</h2>
                <p>Please create an account.</p>
              </div>
            ),
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
          setTimeout(() => {
            void router.push("/signup");
          }, 1500);
        } else if (error.response?.status === 401) {
          toast.update(toastId, {
            render: (
              <div className="">
                <h2 className="font-semibold">Invalid OTP!</h2>
                <p>Please enter a valid OTP.</p>
              </div>
            ),
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        } else if (error.response?.status === 403) {
          toast.update(toastId, {
            render: (
              <div className="">
                <h2 className="font-semibold">OTP Expired!</h2>
                <p>Please resend OTP.</p>
              </div>
            ),
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        } else if (error.response?.status === 400) {
          toast.update(toastId, {
            render: <BadRequest />,
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        }
        return;
      }
      toast.update(toastId, {
        render: <ServerError />,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      return;
    }
  }

  const resendOTP = async () => {
    const toastId = toast.loading("Sending OTP...", {
      autoClose: false,
    });

    try {
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
      toast.update(toastId, {
        render: (
          <div className="">
            <h2 className="font-semibold">OTP sent successfully!</h2>
            <p>Please check your email for the OTP.</p>
          </div>
        ),
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      return;
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        if (error.response?.status === 404) {
          toast.update(toastId, {
            render: (
              <div className="">
                <h2 className="font-semibold">No account found!</h2>
                <p>Please create an account.</p>
              </div>
            ),
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
          setTimeout(() => {
            void router.push("./signup");
          }, 1500);
        } else if (error.response?.status === 403) {
          toast.update(toastId, {
            render: (
              <div className="">
                <h2 className="font-semibold">User is already verified!</h2>
                <p>Please login.</p>
              </div>
            ),
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
          setTimeout(() => {
            void router.push("./login");
          }, 1500);
        } else if (error.response?.status === 400) {
          toast.update(toastId, {
            render: <BadRequest />,
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        }
        return;
      }
      toast.update(toastId, {
        render: <ServerError />,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      return;
    }
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
