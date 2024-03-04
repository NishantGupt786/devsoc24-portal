"use client";

import { joinTeamSchema } from "@/schemas/signup";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CreateTeamFormValues = z.infer<typeof joinTeamSchema>;

export default function JoinTeamForm() {
  const createTeamForm = useForm<CreateTeamFormValues>({
    resolver: zodResolver(joinTeamSchema),
    defaultValues: {
      teamCode: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: CreateTeamFormValues) {
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
    <Form {...createTeamForm}>
      <form
        onSubmit={createTeamForm.handleSubmit(onSubmit)}
        className="mx-auto mt-4 flex w-9/12 flex-col gap-4 py-4 text-primary md:w-1/3"
      >
        <FormField
          control={createTeamForm.control}
          name="teamCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Code</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Team Code"
                    {...field}
                    className={` ${
                      createTeamForm.getFieldState("teamCode").invalid
                        ? "border-red-500 focus:border-input focus:!ring-red-500"
                        : ""
                    }`}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Join Team</Button>
      </form>
    </Form>
  );
}
