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
// import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon, MailIcon } from "lucide-react";
import Link from "next/link";

type LoginFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
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
                  <MailIcon
                    color="gray"
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setIsPasswordVisible((previousValue) => !previousValue)
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
                  <MailIcon
                    color="gray"
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setIsCPasswordVisible((previousValue) => !previousValue)
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
  );
}
