"use client";

import { createTeamSchema } from "@/schemas/signup";
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
import toast from "react-hot-toast";
import axios, { type AxiosError } from "axios";
import { type APIResponse } from "@/schemas/api";
import { useRouter } from "next/navigation";
import ToastContainer from "../ToastContainer";

type CreateTeamFormValues = z.infer<typeof createTeamSchema>;

export default function CreateTeamForm() {
  const router = useRouter();
  const createTeamForm = useForm<CreateTeamFormValues>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      teamName: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: CreateTeamFormValues) {
    const handleSubmit = async () => {
      await axios.post<APIResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/team/create`,
        { name: data.teamName },
        {
          withCredentials: true,
        },
      );
    };

    void toast.promise(handleSubmit(), {
      loading: "Cooking...",
      success: () => {
        void router.push("/home");
        return `Team created successfully!`;
      },
      error: (err: AxiosError) => {
        switch (err.response?.status) {
          case 404:
            return `Account not found!`;
          case 417:
            return `User is already in a team!`;
          case 409:
            return `Teamname already exists!`;
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
            name="teamName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Team Name"
                      {...field}
                      className={` ${
                        createTeamForm.getFieldState("teamName").invalid
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
          <Button type="submit">Create Team</Button>
        </form>
      </Form>
    </>
  );
}
