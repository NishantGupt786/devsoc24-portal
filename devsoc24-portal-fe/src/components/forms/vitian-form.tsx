"use client";

import blocks from "@/../public/hostels.json";
import { vitianDetails } from "@/schemas/signup";
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

type VitianDetailsFormValues = z.infer<typeof vitianDetails>;

export default function VitianForm({
  setForm,
}: {
  setForm: React.Dispatch<React.SetStateAction<number>>;
}) {
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

  async function onSubmit(data: VitianDetailsFormValues) {
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
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your block" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {blocks.map((block, index) => (
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
  );
}
