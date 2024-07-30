import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { IdeaStore } from "@/store/store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ideaSchema } from "@/schemas/idea";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface FormValues {
  title: string;
  track: string;
  description: string;
  figma_link?: string;
  github_link?: string;
  others: string;
}

interface SubmitProjectResponse {
  message: string;
  status: string;
  data: unknown;
}

import send from "@/assets/images/Send.svg";
import Image from "next/image";
import ToastContainer from "@/components/ToastContainer";
import refreshToken from "@/services/refreshtoken";
const tracks = [
  "Interactive Engagement",
  "Eco-Innovations",
  "Community Building",
  "Future of Work",
  "Ethical Technology",
  "Open Innovation",
];

export default function SubmitIdeaForm() {
  const { getIdea, SetIdea } = IdeaStore();
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(ideaSchema),
    defaultValues: {
      title: "",
      track: "",
      description: "",
      figma_link: "",
      github_link: "",
      others: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: FormValues) {
    const handleSubmit = async () => {
      await refreshToken()
      await axios.post<SubmitProjectResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/idea/create`,
        data,
        {
          withCredentials: true,
        },
      );
    };
    void toast.promise(handleSubmit(), {
      loading: "Cooking...",
      success: () => {
        SetIdea("idea found");
        void router.push("/home");
        return `Idea submitted successfully!`;
      },
      error: (err: AxiosError) => {
        switch (err.response?.status) {
          case 404:
            return `Account not found!`;
          case 403:
            return `User is not a leader`;
          case 409:
            return `User is not in a team`;
          case 400:
            return `Please check your input and try again!`;
          case 401:
            void router.push("/");
            return `Session Expired`;
          default:
            return `Something went wrong!`;
        }
      },
    });
  }

  return (
    <>
      <ToastContainer />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-fit flex-col items-center">
            <div className="flex  items-center justify-center ">
              <div className="flex w-min justify-start gap-16 max-[931px]:flex-col max-[931px]:gap-6">
                <div className="flex w-96 flex-col gap-6 max-[445px]:w-[87vw] ">
                  <div>
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid w-full max-w-sm items-center gap-4">
                              <Label
                                htmlFor="project-name"
                                className="text-[#0019FF]"
                              >
                                Project Name
                                <span className="text-[#FF0000]">*</span>
                              </Label>
                              <Input
                                type="text"
                                id="project-name"
                                {...field}
                                className={`h-14 bg-white pl-5 ${
                                  form.getFieldState("title").invalid
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
                      name="track"
                      render={({}) => (
                        <Controller
                          name="track"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="grid w-full max-w-sm items-center gap-4">
                                  <Label
                                    htmlFor="project-track"
                                    className="text-[#0019FF] "
                                  >
                                    Project Track
                                    <span className="text-[#FF0000]">*</span>
                                  </Label>
                                  <select
                                    value={form.watch("track")}
                                    onChange={(e) =>
                                      form.setValue("track", e.target.value)
                                    }
                                    className="rounded-md border border-gray-200 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
                                  >
                                    <option value="" disabled selected hidden>
                                      Select Project Track
                                    </option>
                                    {tracks.map((track) => (
                                      <option key={track} value={track}>
                                        {track}
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
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid w-full max-w-sm items-center gap-4">
                              <Label
                                htmlFor="description"
                                className="text-[#0019FF]"
                              >
                                Description of Project
                                <span className="text-[#FF0000]">*</span>
                              </Label>

                              <Textarea
                                id="description"
                                {...field}
                                placeholder="Don't forget to include your inspiration, learnings, project construction method, and difficulties you encountered in your writing. "
                                className="col-span-12 mb-6 max-h-72 min-h-40 pl-5 text-black md:col-span-6 md:mb-0"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    ></FormField>

                    <p className="pr-2 text-right">2500 characters max</p>
                  </div>
                </div>
                <div className="flex w-96 flex-col gap-6 max-[445px]:w-[87vw]">
                  <div>
                    <FormField
                      control={form.control}
                      name="figma_link"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid w-full max-w-sm items-center gap-4">
                              <Label
                                htmlFor="figmaLink"
                                className="text-[#0019FF]"
                              >
                                Figma Link
                              </Label>
                              <Input
                                type="text"
                                id="figmaLink"
                                {...field}
                                className={`h-14 bg-white pl-5 ${
                                  form.getFieldState("figma_link").invalid
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
                      name="github_link"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid w-full max-w-sm items-center gap-4">
                              <Label
                                htmlFor="githubLink"
                                className="text-[#0019FF]"
                              >
                                GitHub Link
                              </Label>
                              <Input
                                type="text"
                                id="githubLink"
                                {...field}
                                className={`h-14 bg-white pl-5 ${
                                  form.getFieldState("github_link").invalid
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
                      name="others"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid w-full max-w-sm items-center gap-4">
                              <Label
                                htmlFor="otherLinks"
                                className="text-[#0019FF]"
                              >
                                Other Links
                              </Label>

                              <Textarea
                                id="otherLinks"
                                {...field}
                                className="col-span-12 mb-6 min-h-10 pl-5 text-black md:col-span-6 md:mb-0"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    ></FormField>

                    <p>
                      Canva PPTs, Videos, Drive or Supporting Material can be
                      shared
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <Button
                className="my-5 bg-[#0019FF]"
                type="submit"
                //   disabled={isSubmitting}
              >
                <Image src={send as HTMLImageElement} alt="b" />
                <span className="pl-2">Submit Idea</span>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
