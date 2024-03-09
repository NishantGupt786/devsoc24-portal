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
import axios, { type AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { type APIResponse } from "@/schemas/api";
import { useRouter } from "next/navigation";
import { BadRequest, ServerError } from "@/components/toast";

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
    const toastId = toast.loading("Joining...", { autoClose: false });
    console.log(data);
    try {
      await axios.post<APIResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
        {},
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
      toast.update(toastId, {
        render: (
          <div className="">
            <h2 className="font-semibold">Success!</h2>
            <p>Team joined successfully.</p>
          </div>
        ),
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setTimeout(() => {
        void router.push("/");
      }, 1500);
      return;
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        if (error.response?.status === 400) {
          toast.update(toastId, {
            render: <BadRequest />,
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
          return;
        } else if (error.response?.status === 417) {
          toast.update(toastId, {
            render: (
              <div className="">
                <h2 className="font-semibold">User is already in a team!</h2>
                <p>Leave the team to create a new one.</p>
              </div>
            ),
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
          return;
        } else if (error.response?.status === 409) {
          toast.update(toastId, {
            render: (
              <div className="">
                <h2 className="font-semibold">Invalid team code!</h2>
                <p>Please check the team code and try again.</p>
              </div>
            ),
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
          return;
        } else if (error.response?.status === 424) {
          toast.update(toastId, {
            render: (
              <div className="">
                <h2 className="font-semibold">Team is full!</h2>
                <p>Try joining another team.</p>
              </div>
            ),
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
          return;
        }
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
