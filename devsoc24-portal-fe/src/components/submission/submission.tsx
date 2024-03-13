import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";

interface FormValues {
  title: string;
  track: string;
  description: string;
  figma_link?: string;
  github_link?: string;
  others: string;
}
interface GetIdea{
  data: FormValues;
  message: string;
  status: string;
}


function Submission() {
  const [ideaDetails, setIdeaDetails] = useState<FormValues>()
  useEffect(() => {
    async function getIdeaSubmission() {
      try {
        const res = await axios.get<GetIdea>(`${process.env.NEXT_PUBLIC_API_URL}/idea`, {
          withCredentials: true,
        });
        // console.log(res.data.data);
        setIdeaDetails(res.data.data);
      } catch (error) {
        // console.log("Error getting idea submission:", error)
      }
    }
    void getIdeaSubmission();
  }, []);
  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>View Submission</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[80vh]"> {/* Scrollable container */}
          <div className="flex flex-col gap-y-2 py-3 text-[#0019FF]">
            <Label htmlFor="projectName" className="text-xs font-semibold">
              Project Name
            </Label>
            <div id="projectName" className="p-2 rounded-md bg-[#F1F1F1]  text-[#ABAFB1]">
              {ideaDetails?.title}
            </div>

            <Label htmlFor="projectTrack" className="text-xs font-semibold">
              Project Track
            </Label>
            <div id="projectTrack" className="p-2 rounded-md bg-[#F1F1F1]  text-[#ABAFB1]">
              {ideaDetails?.track}
            </div>

            <Label htmlFor="description" className="text-xs font-semibold">
              Description of project
            </Label>
            <div
              id="description"
              className="p-2 rounded-md bg-[#F1F1F1] text-[#ABAFB1] text-wrap break-words" 
            >
              {ideaDetails?.description}
            </div>
            <Label htmlFor="figmaLink" className="text-xs font-semibold">
              Figma Link
            </Label>
            <div id="figmaLink" className="p-2 rounded-md bg-[#F1F1F1]  text-[#ABAFB1]">
              {ideaDetails?.figma_link}
            </div>

            <Label htmlFor="githubLink" className="text-xs font-semibold">
              Github Link
            </Label>
            <div id="githubLink" className="p-2 rounded-md bg-[#F1F1F1]  text-[#ABAFB1]">
              {ideaDetails?.github_link}
            </div>

            <Label htmlFor="otherLinks" className="text-xs font-semibold">
              Other Links
            </Label>
            <div id="otherLinks" className="p-2 rounded-md bg-[#F1F1F1]  text-[#ABAFB1]">
              {ideaDetails?.others}
            </div>
          </div>
        </div>
      </DialogContent>
    </>
  );
}

export default Submission;
