import { signupSchema } from "@/schemas/signup";
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
import { EyeIcon, EyeOffIcon, LockKeyholeIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { type APIResponse } from "@/schemas/api";
import axios, { type AxiosError } from "axios";
import { BadRequest, ServerError } from "@/components/toast";
import { useRouter } from "next/navigation";
import ToastContainer from "@/components/ToastContainer";

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  async function onSubmit(formVal: SignupFormValues) {
    const handleSubmit = async () => {
      await axios.post<APIResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/signup`,
        {
          email: formVal.email,
          password: formVal.password,
        },
        {
          withCredentials: true,
        },
      );
    };

    void toast.promise(handleSubmit(), {
      loading: "Cooking...",
      success: (temp) => {
        setTimeout(() => {
          void router.push("./signup/verify?email=" + formVal.email);
        }, 1500);
        return `Account created successfully!\nPlease verify your email`;
      },
      error: (err: AxiosError) => {
        switch (err.response?.status) {
          case 404:
            return `Account not found!`;
          case 409:
            setTimeout(() => {
              void router.push("/");
            }, 1500);
            return `Account already exists!`;
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
            {form.formState.isSubmitting ? "Signing up..." : "Signup"}
          </Button>
        </form>
      </Form>
    </>
  );
}
