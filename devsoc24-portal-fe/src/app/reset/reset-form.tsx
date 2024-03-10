import { resetSchema } from "@/schemas/password";
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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  EyeIcon,
  EyeOffIcon,
  KeyRoundIcon,
  LockKeyhole,
} from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';
import axios, { type AxiosError } from "axios";
import { type APIResponse } from "@/schemas/api";
import { BadRequest, ServerError } from "@/components/toast";
import ToastContainer from "@/components/ToastContainer";

type ResetFormValues = z.infer<typeof resetSchema>;

export default function ResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  async function onSubmit(form: ResetFormValues) {
    console.log(form);
    // const toastId = toast.loading("Reseting...", { autoClose: false });

    try {
      await axios.patch<APIResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
        {
          email: email,
          otp: form.otp,
          new_password: form.password,
        },
        {
          withCredentials: true,
        },
      );
      // toast.update(toastId, {
      //   render: (
      //     <div className="">
      //       <h2 className="font-semibold">Password reset successfully!</h2>
      //       <p>Please login with your new password.</p>
      //     </div>
      //   ),
      //   type: "success",
      //   isLoading: false,
      //   autoClose: 2000,
      // });

      setTimeout(() => {
        void router.push("/login");
      }, 1500);
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        if (error.response?.status === 409) {
          // toast.update(toastId, {
          //   render: (
          //     <div className="">
          //       <h2 className="font-semibold">Incorrect password!</h2>
          //       <p>Please try again.</p>
          //     </div>
          //   ),
          //   type: "error",
          //   isLoading: false,
          //   autoClose: 2000,
          // });
        } else if (error.response?.status === 404) {
          // toast.update(toastId, {
          //   render: (
          //     <div className="">
          //       <h2 className="font-semibold">Account not found!</h2>
          //       <p>Please signup.</p>
          //     </div>
          //   ),
          //   type: "error",
          //   isLoading: false,
          //   autoClose: 2000,
          // });
        } else if (error.response?.status === 403) {
          // toast.update(toastId, {
          //   render: (
          //     <div className="">
          //       <h2 className="font-semibold">OTP expired!</h2>
          //       <p>Please request a new OTP.</p>
          //     </div>
          //   ),
          //   type: "error",
          //   isLoading: false,
          //   autoClose: 2000,
          // });
          setTimeout(() => {
            void router.push("/reset");
          }, 1500);
        } else if (error.response?.status === 401) {
          // toast.update(toastId, {
          //   render: (
          //     <div className="">
          //       <h2 className="font-semibold">Invalid OTP!</h2>
          //       <p>Please try again.</p>
          //     </div>
          //   ),
          //   type: "error",
          //   isLoading: false,
          //   autoClose: 2000,
          // });
        } else if (error.response?.status === 400) {
          // toast.update(toastId, {
          //   render: <BadRequest />,
          //   type: "error",
          //   isLoading: false,
          //   autoClose: 2000,
          // });
        }
        return;
      }
      // toast.update(toastId, {
      //   render: <ServerError />,
      //   type: "error",
      //   isLoading: false,
      //   autoClose: 2000,
      // });
      return;
    }
  }

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
                      maxLength={6}
                      {...field}
                      className={`h-14 bg-gray-100 pl-10 ${
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                {/* <FormLabel>Password</FormLabel> */}
                <FormControl>
                  <div className="relative">
                    <Input
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Password"
                      autoComplete="password"
                      {...field}
                      className={`h-14 bg-gray-100 px-10 ${
                        form.getFieldState("password").invalid
                          ? "border-red-500 focus:border-input focus:!ring-red-500"
                          : ""
                      }`}
                    />
                    <LockKeyhole
                      color="gray"
                      className="absolute left-2 top-1/2 -translate-y-1/2"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setIsPasswordVisible(
                            (previousValue) => !previousValue,
                          )
                        }
                      >
                        {isPasswordVisible ? (
                          <EyeOffIcon color="gray" size={20} />
                        ) : (
                          <EyeIcon color="gray" size={20} />
                        )}
                      </Button>
                    </div>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="relative">
                {/* <FormLabel>Password</FormLabel> */}
                <FormControl>
                  <div className="relative">
                    <Input
                      type={isCPasswordVisible ? "text" : "password"}
                      placeholder="Confirm Password"
                      {...field}
                      className={`h-14 bg-gray-100 px-10 ${
                        form.getFieldState("confirmPassword").invalid
                          ? "border-red-500 focus:border-input focus:!ring-red-500"
                          : ""
                      }`}
                    />
                    <LockKeyhole
                      color="gray"
                      className="absolute left-2 top-1/2 -translate-y-1/2"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setIsCPasswordVisible(
                            (previousValue) => !previousValue,
                          )
                        }
                      >
                        {isCPasswordVisible ? (
                          <EyeOffIcon color="gray" size={20} />
                        ) : (
                          <EyeIcon color="gray" size={20} />
                        )}
                      </Button>
                    </div>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary">
              Login
            </Link>
          </p>

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="mx-auto mt-4 w-fit px-14"
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </>
  );
}
