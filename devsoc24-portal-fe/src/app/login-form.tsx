import { loginSchema } from "@/schemas/login";
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
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon, LockKeyholeIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { type LoginResponse } from "@/schemas/api";
import axios, { type AxiosError } from "axios";
import { BadRequest, ServerError } from "@/components/toast";
import ToastContainer from "@/components/ToastContainer";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  interface APIResponse {
    message: string;
    status: string;
    data?: {
      profile_complete: boolean;
    };
  }
  async function onSubmit(formVal: LoginFormValues) {
    const submitForm = async () => {
      const { data } = await axios.post<APIResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        { email: formVal.email, password: formVal.password },
        {
          withCredentials: true,
        },
      );
    };

    void toast.promise(submitForm(), {
      loading: "Cooking...",
      success: (temp) => {
        void router.push("/home");
        return `Logged in successfully!`;
      },
      error: (err: AxiosError) => {
        console.log("ERR", err);
        switch (err.response?.status) {
          case 404:
            return `Account not found!`;
          case 409:
            return `Incorrect credentials`;
          case 403:
            setTimeout(() => {
              toast.dismiss();
            }, 1200);
            setTimeout(() => {
              void router.push("/signup/verify?email=" + formVal.email);
            }, 1500);
            return `Email not verified\nRedirecting...`;
          case 423:
            setTimeout(() => {
              toast.dismiss();
            }, 1200);
            setTimeout(() => {
              void router.push("/signup/details?email=" + formVal.email);
            }, 1500);
            return `Complete your profile\nRedirecting...`;
          case 400:
            return `Please check your input and try again!`;
          default:
            return `Something went wrong!`;
        }
      },
    });
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
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Username</FormLabel> */}
                <FormControl>
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Email Address"
                      autoComplete="email"
                      {...field}
                      className={`h-14 bg-gray-100 pl-10 ${
                        form.getFieldState("email").invalid
                          ? "border-red-500 focus:border-input focus:!ring-red-500"
                          : ""
                      }`}
                    />
                    <MailIcon
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
                    <LockKeyholeIcon
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

          <Link
            href="/forgot"
            className="-mt-1 text-right text-sm font-medium text-primary"
          >
            Recover password
          </Link>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-primary">
              Sign Up
            </Link>
          </p>

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="mx-auto mt-4 w-fit px-14"
          >
            {form.formState.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </>
  );
}
