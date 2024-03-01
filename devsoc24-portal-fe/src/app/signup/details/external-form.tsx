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

type ExternalDetailsFormValues = z.infer<typeof externalDetails>;

export default function ExternalForm() {
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
                    placeholder="Registration Number"
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
              {/* <FormLabel>VIT Email Address</FormLabel> */}
              <FormControl>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="College City"
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
        <Button
          type="submit"
          disabled={externalForm.formState.isSubmitting}
          className="mx-auto mt-4 w-fit px-14"
        >
          {externalForm.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
