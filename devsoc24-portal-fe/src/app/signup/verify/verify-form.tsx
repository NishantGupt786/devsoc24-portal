import { verifySchema } from "@/schemas/signup";
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
// import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { KeyRoundIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTime } from "@/lib/utils";

type LoginFormValues = z.infer<typeof verifySchema>;

export default function VerifyForm() {
  const [timer, setTimer] = useState(11);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      otp: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: LoginFormValues) {
    console.log(data);
    // const toastId = toast.loading("Logging in...", { autoClose: false });
    // const res = await loginUser(data);

    // toast.update(toastId, {
    //   render:
    //     res === 200 ? "Login successful!" : res !== 500 ? res : <ServerError />,
    //   type: res === 200 ? "success" : "error",
    //   isLoading: false,
    //   autoClose: 2000,
    // });

    // if (res === 200) {
    //   setTimeout(() => {
    //     void router.push("/overview");
    //   }, 2000);
    // }
  }

  return (
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

        <p className="text-center text-sm text-muted-foreground">
          Haven&apos;t received OTP?{" "}
          <Link
            href="/login"
            className={`font-medium ${timer <= 0 ? "text-primary" : ""}`}
          >
            {timer <= 0 ? "Resend" : `Resend in ${getTime(timer)}`}
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
  );
}
