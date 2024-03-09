import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { type z } from "zod";
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

interface FormValues {
  projectName: string;
  projectTrack: string;
  description: string;
  figmaLink: string;
  githubLink: string;
  otherLinks: string;
}

import send from "@/assets/images/Send.svg";
import Image from "next/image";
const tracks = ["Track 1", "Track 2", "Track 3"];

export default function SubmitIdeaForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(ideaSchema),
    defaultValues: {
      projectName: "",
      projectTrack: "",
      description: "",
      figmaLink: "",
      githubLink: "",
      otherLinks: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: FormValues) {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-start gap-16 max-[931px]:flex-col max-[931px]:gap-6">
          <div className="flex w-96 flex-col gap-6 max-[445px]:w-[87vw]">
            <div>
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid w-full max-w-sm items-center gap-4">
                        <Label
                          htmlFor="project-name"
                          className="text-[#0019FF]"
                        >
                          Project Name<span className="text-[#FF0000]">*</span>
                        </Label>
                        <Input
                          type="text"
                          id="project-name"
                          {...field}
                          placeholder="Shuttle tracker"
                          className={`h-14 bg-white pl-5 ${
                            form.getFieldState("projectName").invalid
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
                name="projectTrack"
                render={({}) => (
                  <Controller
                    name="projectTrack"
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
                              value={form.watch("projectTrack")}
                              onChange={(e) =>
                                form.setValue("projectTrack", e.target.value)
                              }
                              className="rounded-md border border-gray-200 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                              <option value="">Select Project Track</option>
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
                        <Label htmlFor="description" className="text-[#0019FF]">
                          Description of Project
                          <span className="text-[#FF0000]">*</span>
                        </Label>

                        <Textarea
                          id="description"
                          {...field}
                          placeholder="Don't forget to include your inspiration, learnings, project construction method, and difficulties you encountered in your writing. "
                          className="col-span-12 mb-6 max-h-72 min-h-40 text-black md:col-span-6 md:mb-0 pl-5"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <p className="pr-2 text-right">500 max words</p>
            </div>
          </div>
          <div className="flex w-96 flex-col gap-6 max-[445px]:w-[87vw]">
            <div>
              <FormField
                control={form.control}
                name="figmaLink"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid w-full max-w-sm items-center gap-4">
                        <Label htmlFor="figmaLink" className="text-[#0019FF]">
                          Figma Link
                        </Label>
                        <Input
                          type="text"
                          id="figmaLink"
                          placeholder="Figma link"
                          {...field}
                          className={`h-14 bg-white pl-5 ${
                            form.getFieldState("figmaLink").invalid
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
                name="githubLink"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid w-full max-w-sm items-center gap-4">
                        <Label htmlFor="githubLink" className="text-[#0019FF]">
                          GitHub Link
                        </Label>
                        <Input
                          type="text"
                          id="githubLink"
                          {...field}
                          placeholder="Github link"
                          className={`h-14 bg-white pl-5 ${
                            form.getFieldState("githubLink").invalid
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
                name="otherLinks"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid w-full max-w-sm items-center gap-4">
                        <Label htmlFor="otherLinks" className="text-[#0019FF]">
                          Other Links
                        </Label>

                        <Textarea
                          id="otherLinks"
                          placeholder="Other links"
                          {...field}
                          className="col-span-12 mb-6 min-h-10 text-black md:col-span-6 md:mb-0 pl-5"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <p>
                Canva PPTs, Videos, Drive or Supporting Material can be shared
              </p>
            </div>
          </div>
        </div>

        <Button
          className="my-5 bg-[#0019FF]"
          type="submit"
          //   disabled={isSubmitting}
        >
          <Image src={send as HTMLImageElement} alt="b" />
          <span className="pl-2">Submit Idea</span>
        </Button>
      </form>
    </Form>
  );
}
