"use client";

import { hostelDetails } from "public/hostels";
import { vitianDetails } from "@/schemas/signup";
import React, { useEffect, useState } from "react";
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
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import axios, { type AxiosError } from "axios";
import { type APIResponse } from "@/schemas/api";
import ToastContainer from "../ToastContainer";
import refreshToken from "@/services/refreshtoken";

type VitianDetailsFormValues = z.infer<typeof vitianDetails>;

export default function VitianForm({
  setForm,
}: {
  setForm: React.Dispatch<React.SetStateAction<number>>;
}) {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const vitianForm = useForm<VitianDetailsFormValues>({
    resolver: zodResolver(vitianDetails),
    defaultValues: {
      regNumber: "",
      vitEmail: "",
      block: undefined,
      roomNumber: "",
    },
    mode: "onChange",
  });
  const [gender, setGender] = useState("");

  async function onSubmit(data: VitianDetailsFormValues) {
    // const toastId = toast.loading("Saving...", { autoClose: false });
    const updatedData = {
      first_name: localStorage.getItem("first_name"),
      last_name: localStorage.getItem("last_name"),
      phone_number: localStorage.getItem("phone_number"),
      gender: localStorage.getItem("gender"),
      country: localStorage.getItem("country"),
      is_vitian: true,
      email: email,
      college: "VIT Vellore",
      city: "Vellore",
      state: "Tamil Nadu",
      reg_no: data.regNumber,
      block: data.block,
      room: data.roomNumber,
      vit_email: data.vitEmail,
    };
    // console.log(updatedData);
    const handleSubmit = async () => {
      await refreshToken()
      await axios.post<APIResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/user/complete-profile`,
        updatedData,
        {
          withCredentials: true,
        },
      );
    };
    void toast.promise(handleSubmit(), {
      loading: "Cooking...",
      success: () => {
        setTimeout(() => setForm(2), 1500);
        return `Profile completed successfully!`;
      },
      error: (err: AxiosError) => {
        switch (err.response?.status) {
          case 403:
            return `Email not verified\nRedirecting...`;
          case 404:
            return `Account not found!`;
          case 409:
            return `Incorrect credentials`;
          case 400:
            return `Please check your input and try again!`;
          default:
            return `Something went wrong!`;
        }
      },
    });
  }
  useEffect(() => {
    const temp = localStorage.getItem("gender");
    setGender(temp!);
  }, []);

  const [day, setDay] = useState(false);

  // useEffect(() => {
  //   if (vitianForm.getValues("block") === "Day Scholar") {
  //     setDay(true);
  //   } else {
  //     setDay(false);
  //   }
  // }, [vitianForm.getValues("block")]);

  return (
    <>
      <ToastContainer />
      <Form {...vitianForm}>
        <form
          onSubmit={vitianForm.handleSubmit(onSubmit)}
          className="mx-auto mt-4 flex w-9/12 flex-col gap-4 py-4 text-primary md:w-1/3"
        >
          <FormField
            control={vitianForm.control}
            name="regNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Registration Number"
                      {...field}
                      className={` ${
                        vitianForm.getFieldState("regNumber").invalid
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
            control={vitianForm.control}
            name="vitEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>VIT Email Address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="VIT Email Address"
                      {...field}
                      className={` ${
                        vitianForm.getFieldState("vitEmail").invalid
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
            control={vitianForm.control}
            name="block"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Block</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e);
                        console.log(e);
                        if (e === "Day Scholar") {
                          vitianForm.setValue("roomNumber", "0");
                          setDay(true);
                        } else {
                          setDay(false);
                        }
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your block" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gender === "Male"
                          ? hostelDetails.mens.map((block, index) => (
                              <SelectItem
                                key={index}
                                value={block}
                                className="rounded-none border-b border-border/30"
                              >
                                <span>{block}</span>
                              </SelectItem>
                            ))
                          : gender === "Female"
                            ? hostelDetails.ladies.map((block, index) => (
                                <SelectItem
                                  key={index}
                                  value={block}
                                  className="rounded-none border-b border-border/30"
                                >
                                  <span>{block}</span>
                                </SelectItem>
                              ))
                            : hostelDetails.all.map((block, index) => (
                                <SelectItem
                                  key={index}
                                  value={block}
                                  className="rounded-none border-b border-border/30"
                                >
                                  <span>{block}</span>
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
            control={vitianForm.control}
            name="roomNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Room Number"
                      {...field}
                      disabled={day}
                      value={day ? "-" : field.value}
                      className={` ${
                        vitianForm.getFieldState("roomNumber").invalid
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
              Prev
            </Button>
            <Button
              type="submit"
              disabled={vitianForm.formState.isSubmitting}
              className="mx-auto mt-4 w-fit px-14"
            >
              {vitianForm.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
