import AnimateSection from "@/components/AnimateSection";
import { MdOutlineInsertChartOutlined, MdArrowRightAlt } from "react-icons/md";

function TitleOfMarketList() {
  return (
    <div className="flex flex-col items-center justify-center">
      <button className="flex items-center text-sm border border-[#ccc]/40 px-[10px] py-[6px] rounded-2xl mb-[55px] z-10">
        <MdOutlineInsertChartOutlined
          className="w-[22px] h-[22px] mr-[5px]"
          color="var(--color-primary)"
        />
        New opportunities
      </button>

      <AnimateSection />

      <button className="flex items-center bg-[var(--color-primary)] text-white text-sm px-[18px] py-[8px] rounded-[10px] mt-[30px] z-10">
        View All coins
        <MdArrowRightAlt className="w-[25px] h-[25px] ml-[3px]" />
      </button>
    </div>
  );
}

export default TitleOfMarketList;
