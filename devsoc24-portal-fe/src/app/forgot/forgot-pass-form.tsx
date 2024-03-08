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
// import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { MailIcon } from "lucide-react";
import Link from "next/link";

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

  async function onSubmit(data: ForgotFormValues) {
    console.log(data);
  
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
  );
}
