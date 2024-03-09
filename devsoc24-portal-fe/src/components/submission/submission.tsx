import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";


const projectTracks = [
  { id: "track1", name: "Track 1" },
  { id: "track2", name: "Track 2" },
  { id: "track3", name: "Track 3" },
  { id: "track4", name: "Track 4" },
];

const projectInfo = {
  projectName: "lorem ipsum",
  projectTrack: "jndcjskdcnsjck",
  description: "This is a detailed description of the project",
  figmaLink: "https://www.figma.com/",
  githubLink: "https://www.github.com/",
  otherLinks: "https://www.otherlink.com",
};

function Submission() {
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
              {projectInfo.projectName}
            </div>

            <Label htmlFor="projectTrack" className="text-xs font-semibold">
              Project Track
            </Label>
            <div id="projectTrack" className="p-2 rounded-md bg-[#F1F1F1]  text-[#ABAFB1]">
              {projectTracks.find(track => track.id === projectInfo.projectTrack)?.name ?? "Track not found"}
            </div>

            <Label htmlFor="description" className="text-xs font-semibold">
              Description of project
            </Label>
            <div
              id="description"
              className="p-2 rounded-md bg-[#F1F1F1]  text-[#ABAFB1]"
              style={{ minHeight: '100px' }}
            >
              {projectInfo.description}
            </div>

            <Label htmlFor="figmaLink" className="text-xs font-semibold">
              Figma Link
            </Label>
            <div id="figmaLink" className="p-2 rounded-md bg-[#F1F1F1]  text-[#ABAFB1]">
              {projectInfo.figmaLink}
            </div>

            <Label htmlFor="githubLink" className="text-xs font-semibold">
              Github Link
            </Label>
            <div id="githubLink" className="p-2 rounded-md bg-[#F1F1F1]  text-[#ABAFB1]">
              {projectInfo.githubLink}
            </div>

            <Label htmlFor="otherLinks" className="text-xs font-semibold">
              Other Links
            </Label>
            <div id="otherLinks" className="p-2 rounded-md bg-[#F1F1F1]  text-[#ABAFB1]">
              {projectInfo.otherLinks}
            </div>
          </div>
        </div>
      </DialogContent>
    </>
  );
}

export default Submission;
