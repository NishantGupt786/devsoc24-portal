"use client";

import states from "@/../public/states.json";
import { externalDetails } from "@/schemas/signup";
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
import toast, { Toaster } from "react-hot-toast";
import axios, { type AxiosError } from "axios";
import { type APIResponse } from "@/schemas/api";
import { BadRequest, ServerError } from "@/components/toast";
import { useSearchParams } from "next/navigation";
import ToastContainer from "../ToastContainer";

type ExternalDetailsFormValues = z.infer<typeof externalDetails>;

export default function ExternalForm({
  setForm,
}: {
  setForm: React.Dispatch<React.SetStateAction<number>>;
}) {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const externalForm = useForm<ExternalDetailsFormValues>({
    resolver: zodResolver(externalDetails),
    defaultValues: {
      collegeName: "",
      collegeCity: "",
      collegeState: undefined,
      collegeRollNumber: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: ExternalDetailsFormValues) {
    // const toastId = toast.loading("Saving...", { autoClose: false });
    const updatedData = {
      first_name: localStorage.getItem("first_name"),
      last_name: localStorage.getItem("last_name"),
      phone: localStorage.getItem("phone_number"),
      gender: localStorage.getItem("gender"),
      country: localStorage.getItem("country"),
      is_vitian: false,
      email: email,
      college: data.collegeName,
      city: data.collegeCity,
      state: data.collegeState,
      reg_no: data.collegeRollNumber,
    };
    console.log(updatedData);

    const handleSubmit = async () => {
      await axios.post<APIResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/user/complete-profile`,
        updatedData,
        {
          withCredentials: true,
        },
      );
    };

    void toast.promise(handleSubmit(), {
      loading: "Loading...",
      success: (temp) => {
        setTimeout(() => setForm(2), 1500);
        return `Logged In`;
      },
      error: (err: AxiosError) => {
        switch (err.response?.status) {
          case 404:
            return `Account Not Found`;
          case 409:
            return `Incorrect Credentials`;
          case 403:
            return `Email Not Verified\nVerify your email`;
          case 400:
            return `Please check your input and try again`;
          default:
            return `Something went wrong`;
        }
      },
    });
  }
  return (
    <>
      <ToastContainer />
      <Form {...externalForm}>
        <form
          onSubmit={externalForm.handleSubmit(onSubmit)}
          className="mx-auto mt-4 flex w-9/12 flex-col gap-4 py-4 text-primary md:w-1/3"
        >
          <FormField
            control={externalForm.control}
            name="collegeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>College Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="College Name"
                      required
                      {...field}
                      className={` ${
                        externalForm.getFieldState("collegeName").invalid
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

          <FormField
            control={externalForm.control}
            name="collegeState"
            render={({ field }) => (
              <FormItem>
                <FormLabel>College Location</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {states.map((state, index) => (
                          <SelectItem
                            key={index}
                            value={state}
                            className="rounded-none border-b border-border/30"
                          >
                            <span>{state}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={externalForm.control}
            name="collegeCity"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="College City"
                      required
                      {...field}
                      className={` ${
                        externalForm.getFieldState("collegeCity").invalid
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

          <FormField
            control={externalForm.control}
            name="collegeRollNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>College Identification Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="College Identification Number"
                      required
                      {...field}
                      className={` ${
                        externalForm.getFieldState("collegeRollNumber").invalid
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
          <div className="flex items-center justify-between">
            <Button
              className="mx-auto mt-4 w-fit px-14"
              onClick={() => setForm(0)}
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={externalForm.formState.isSubmitting}
              className="mx-auto mt-4 w-fit px-14"
            >
              {externalForm.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
