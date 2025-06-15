import AnimateSection from "@/components/AnimateSection";
import { MdOutlineInsertChartOutlined, MdArrowRightAlt } from "react-icons/md";

function TitleOfMarketList() {
  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-0">
      <button className="flex items-center text-sm border border-[#ccc]/40 px-3 py-2 rounded-2xl my-[25px] sm:my-12 z-10">
        <MdOutlineInsertChartOutlined
          className="w-5 h-5 mr-1.5"
          color="var(--color-primary)"
        />
        New opportunities
      </button>

      <AnimateSection />

      <button className="flex items-center font-bold bg-[var(--color-primary)] text-white text-sm py-2 px-9 sm:px-5 sm:py-2.5 rounded-[10px] mt-8 z-10 cursor-pointer">
        View All coins
        <MdArrowRightAlt className="w-6 h-6 ml-1" />
      </button>
    </div>
  );
}

export default TitleOfMarketList;
