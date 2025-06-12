function MarketListLoader() {
  const loaderItems = Array.from({ length: 5 });

  return (
    <div className="flex flex-col gap-[20px] px-[20px]">
      {loaderItems.map((_, i) => (
        <div key={i} className="flex justify-between">
          <div className="flex items-center">
            <div className="w-[37px] h-[37px] bg-[#27272E] rounded-full mr-[12px]" />
            <div className="w-[110px] h-[17px] bg-[#27272E] rounded-2xl" />
          </div>
          <div className="flex flex-col gap-[7px] items-end">
            <div className="w-[80px] h-[17px] bg-[#27272E] rounded-2xl" />
            <div className="w-[65px] h-[17px] bg-[#27272E] rounded-2xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MarketListLoader;
