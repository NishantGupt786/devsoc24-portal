import Image from "next/image";
import contentstack from "@/assets/images/contentstack.svg";
import hallofcricket from "@/assets/images/hallofcricket.svg";
import quillbot from "@/assets/images/quillbot.svg";

function Sponsors() {
  return (
    <div className="mb-4 h-full w-full overflow-auto rounded-xl bg-white md:w-[32vw] lg:h-[36vh]">
      <div className="pl-6 pt-4 font-semibold text-[#45464E]">Sponsors</div>
      <div className="flex flex-col items-center justify-center pt-3">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={contentstack as HTMLImageElement}
            alt="titlesponsor"
            width={200}
          />
          <p className="text-lg font-semibold">Title sponsor</p>
        </div>

        <div className="flex w-full justify-between pl-12 pr-8">
          <div className="flex flex-col items-center justify-center pt-3">
            <Image
              src={hallofcricket as HTMLImageElement}
              alt="inkind"
              width={100}
            />
            <p className="text-lg font-semibold">In Kind sponsor</p>
          </div>
          <div className="flex flex-col items-center justify-end pt-3">
            <Image
              src={quillbot as HTMLImageElement}
              alt="inkind"
              width={150}
            />
            <p className="text-lg font-semibold">In Kind sponsor</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sponsors;
