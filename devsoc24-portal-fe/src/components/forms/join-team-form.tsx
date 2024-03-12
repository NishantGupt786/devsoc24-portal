"use client";

import { joinTeamSchema } from "@/schemas/signup";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
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
import axios, { Axios, type AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { type APIResponse } from "@/schemas/api";
import { useRouter } from "next/navigation";
import { BadRequest, ServerError } from "@/components/toast";
import ToastContainer from "../ToastContainer";

type CreateTeamFormValues = z.infer<typeof joinTeamSchema>;

export default function JoinTeamForm() {
  const router = useRouter();
  const createTeamForm = useForm<CreateTeamFormValues>({
    resolver: zodResolver(joinTeamSchema),
    defaultValues: {
      teamCode: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: CreateTeamFormValues) {
    console.log(data);
    const handleSubmit = async () => {
      await axios.post<APIResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
        {
          nallaData: "",
        },
        {
          withCredentials: true,
        },
      );
      await axios.post<APIResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/team/join`,
        { code: data.teamCode },
        {
          withCredentials: true,
        },
      );
    };
    void toast.promise(handleSubmit(), {
      loading: "Cooking...",
      success: (temp) => {
        void router.push("/");
        return `Team joined successfully!`;
      },
      error: (err: AxiosError) => {
        switch (err.response?.status) {
          case 404:
            return `Account not found!`;
          case 417:
            return `User already in a team!`;
          case 409:
            return `Invalid Team Code!`;
          case 424:
            return `Team is full!`;
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
                        createTeamForm.formState.errors.teamCode
                          ? "border-red-500 focus:border-input focus:!ring-red-500"
                          : ""
                      }`}
                    />
                  </div>
                </FormControl>
                {/* Display error message */}
                {createTeamForm.formState.errors.teamCode && (
                  <FormMessage>
                    {createTeamForm.formState.errors.teamCode.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <Button type="submit">Join Team</Button>
        </form>
      </Form>
    </>
  );
}
