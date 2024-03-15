import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { profileSchema } from "@/schemas/profile";
import toast from "react-hot-toast";
import axios, { type AxiosResponse } from "axios";
import { type userProps } from "@/interfaces";
import ToastContainer from "@/components/ToastContainer";
import { hostelDetails } from "public/hostels";

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  gender: string;
  vit_email: string;
  block: string;
  room: string;
  college: string;
  city: string;
  state: string;
  reg_no: string;
}

interface SubmitProjectResponse {
  message: string;
  status: string;
  data: unknown;
}

import send from "@/assets/images/Send.svg";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Profile() {
  const router = useRouter();
  useEffect(() => {
    async function getIdeaSubmission() {
      try {
        const response: AxiosResponse<userProps> = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
          {
            withCredentials: true,
          },
        );
        // console.log(response.data.data);
        form.reset(response.data.data);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          switch (e.response?.status) {
            case 401:
              void router.push("/");
              break;
            case 404:
              // console.log("no team");
              break;
            case 409:
              // console.log("Not in team");
              break;
            default:
              toast.error("Something went wrong"); //I just hope this works, check karlo bhay
              // console.log(e);
              break;
          }
        }
        // console.log("Error getting idea submission:", error);
      }
    }
    void getIdeaSubmission();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      vit_email: "",
      block: "",
      room: "",
      reg_no: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: FormValues) {
    // console.log(data);
    const handleSubmit = async () => {
      const res = await axios.patch<SubmitProjectResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update`,
        data,
        {
          withCredentials: true,
        },
      );
      // console.log(res.data);
    };
    void toast.promise(handleSubmit(), {
      loading: `Cooking...`,
      success: `Profile updated successfully!`,
      error: `Something went wrong!`,
    });
  }
  useEffect(() => {
    form.setValue("block", "men's hostel - c block");
  }, []);

  return (
    <>
      <ToastContainer />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-lg bg-white p-4"
        >
          <div className="flex justify-start gap-16 max-[931px]:flex-col max-[931px]:gap-6">
            <div className="flex w-96 flex-col gap-6 max-[445px]:w-[87vw]">
              <div>
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid w-full max-w-sm items-center gap-4">
                          <Label
                            htmlFor="first-name"
                            className="text-[#0019FF]"
                          >
                            First Name
                            <span className="text-[#FF0000]">*</span>
                          </Label>
                          <Input
                            type="text"
                            id="first-name"
                            {...field}
                            className={`h-10 bg-white pl-5 ${
                              form.getFieldState("first_name").invalid
                                ? "border-red-500 focus:border-input focus:!ring-red-500"
                                : ""
                            }`}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid w-full max-w-sm items-center gap-4">
                          <Label htmlFor="last-name" className="text-[#0019FF]">
                            Last Name
                            <span className="text-[#FF0000]">*</span>
                          </Label>
                          <Input
                            type="text"
                            id="last-name"
                            {...field}
                            className={`h-10 bg-white pl-5 ${
                              form.getFieldState("last_name").invalid
                                ? "border-red-500 focus:border-input focus:!ring-red-500"
                                : ""
                            }`}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="vit_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid w-full max-w-sm items-center gap-4">
                          <Label htmlFor="vit_email" className="text-[#0019FF]">
                            Email
                            <span className="text-[#FF0000]">*</span>
                          </Label>
                          <Input
                            type="text"
                            id="vit_email"
                            {...field}
                            disabled
                            placeholder="vitstudent.ac.in"
                            className={`h-10 bg-white pl-5 ${
                              form.getFieldState("vit_email").invalid
                                ? "border-red-500 focus:border-input focus:!ring-red-500"
                                : ""
                            }`}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid w-full max-w-sm items-center gap-4">
                          <Label htmlFor="phone" className="text-[#0019FF]">
                            Phone Number
                            <span className="text-[#FF0000]">*</span>
                          </Label>
                          <Input
                            type="text"
                            id="phone"
                            {...field}
                            className={`h-10 bg-white pl-5 ${
                              form.getFieldState("phone_number").invalid
                                ? "border-red-500 focus:border-input focus:!ring-red-500"
                                : ""
                            }`}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>
            </div>
            <div className="flex w-96 flex-col gap-6 max-[445px]:w-[87vw]">
              <div>
                <FormField
                  control={form.control}
                  name="reg_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid w-full max-w-sm items-center gap-4">
                          <Label htmlFor="reg_no" className="text-[#0019FF]">
                            Registration Number
                            <span className="text-[#FF0000]">*</span>
                          </Label>
                          <Input
                            type="text"
                            id="reg_no"
                            {...field}
                            className={`h-10 bg-white pl-5 ${
                              form.getFieldState("reg_no").invalid
                                ? "border-red-500 focus:border-input focus:!ring-red-500"
                                : ""
                            }`}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="block"
                  render={({}) => (
                    <Controller
                      name="block"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid w-full max-w-sm items-center gap-4">
                              <Label
                                htmlFor="project-track"
                                className="text-[#0019FF] "
                              >
                                Block
                                <span className="text-[#FF0000]">*</span>
                              </Label>

                              <select
                                value={form.watch("block")}
                                onChange={(e) =>
                                  form.setValue("block", e.target.value)
                                }
                                className="rounded-md border border-gray-200 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
                              >
                                {form.getValues("gender") === "Male" &&
                                  hostelDetails.mens.map((block) => (
                                    <option
                                      key={block}
                                      value={block}
                                      selected={
                                        block === form.getValues("block")
                                      }
                                    >
                                      {block}
                                    </option>
                                  ))}
                                {form.getValues("gender") === "Female" &&
                                  hostelDetails.ladies.map((block) => (
                                    <option
                                      key={block}
                                      value={block}
                                      selected={
                                        block === form.getValues("block")
                                      }
                                    >
                                      {block}
                                    </option>
                                  ))}

                                {form.getValues("gender") ===
                                  "Prefer Not to Say" &&
                                  hostelDetails.all.map((block) => (
                                    <option
                                      key={block}
                                      value={block}
                                      selected={
                                        block === form.getValues("block")
                                      }
                                    >
                                      {block}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                ></FormField>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="room"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid w-full max-w-sm items-center gap-4">
                          <Label htmlFor="room" className="text-[#0019FF]">
                            Room Number
                          </Label>
                          <Input
                            type="text"
                            id="room"
                            {...field}
                            className={`h-10 bg-white pl-5 ${
                              form.getFieldState("room").invalid
                                ? "border-red-500 focus:border-input focus:!ring-red-500"
                                : ""
                            }`}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>
            </div>
          </div>

          <Button
            className="my-5 bg-[#0019FF]"
            type="submit"
            //   disabled={isSubmitting}
          >
            <Image src={send as HTMLImageElement} alt="b" />
            <span className="pl-2">Save</span>
          </Button>
        </form>
      </Form>
    </>
  );
}
