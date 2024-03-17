import { DialogContent, DialogTitle } from "@/components/ui/dialog";

function Choice() {
  return (
    <>
      <DialogContent className="flex min-h-[100px] flex-col items-center justify-center sm:max-w-[425px]">
        <DialogTitle>Idea submission Closed.</DialogTitle>

        {/* <div className="flex justify-evenly w-full ">
            <Button type="submit" className="bg-[#458B71] w-[30%]">
              Create Team
            </Button>
            <Button type="submit" className="bg-[#458B71] w-[30%]">
              Join Team
            </Button>
          </div> */}
      </DialogContent>
    </>
  );
}

export default Choice;
