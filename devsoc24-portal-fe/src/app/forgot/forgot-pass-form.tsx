import { forgotSchema } from "@/schemas/password";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { MailIcon } from "lucide-react";
import Link from "next/link";
import { type APIResponse } from "@/schemas/api";
import axios, { type AxiosError } from "axios";
import { BadRequest, ServerError } from "@/components/toast";

type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function ForgotForm() {
  const router = useRouter();

  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  async function onSubmit(form: ForgotFormValues) {
    console.log(form);
    const toastId = toast.loading("Sending...", { autoClose: false });
    try {
      await axios.post<APIResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
        { email: form.email },
      );
      toast.update(toastId, {
        render: (
          <div className="">
            <h2 className="font-semibold">OTP sent successfully!</h2>
            <p>Redirecting...</p>
          </div>
        ),
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setTimeout(() => {
        void router.push("/reset?email=" + form.email);
      }, 1500);
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        if (error.response?.status === 404) {
          toast.update(toastId, {
            render: (
              <div className="">
                <h2 className="font-semibold">Account not found!</h2>
                <p>Please signup.</p>
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
                <h2 className="font-semibold">Email not verified!</h2>
                <p>Please verify your email.</p>
              </div>
            ),
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
          setTimeout(() => {
            void router.push("/signup/verify?email=" + form.email);
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
            {form.formState.isSubmitting ? "Sending OTP..." : "Send OTP"}
          </Button>
        </form>
      </Form>
    </>
  );
}
