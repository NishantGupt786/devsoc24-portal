import {
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";


function Choice() {
  return (
    <>
      <DialogContent className="min-h-[100px] sm:max-w-[425px] flex flex-col justify-center items-center">
        <DialogTitle>You must join or create a team first.</DialogTitle>

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
