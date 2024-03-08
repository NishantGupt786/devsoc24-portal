import {
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  
  function Choice() {
    return (
      <>
        <DialogContent className="sm:max-w-[425px] min-h-[200px]">
          <DialogHeader>
            <DialogTitle>Join or Create a team</DialogTitle>
          </DialogHeader>
          <div className="flex justify-evenly w-full ">
            <Button type="submit" className="bg-[#458B71] w-[30%]">
              Create Team
            </Button>
            <Button type="submit" className="bg-[#458B71] w-[30%]">
              Join Team
            </Button>
          </div>
        </DialogContent>
      </>
    );
  }
  
  export default Choice;
  