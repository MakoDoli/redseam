"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUpdateQuery } from "@/hooks/useUpdateQuery";
import { ChevronDown } from "lucide-react";

type FilterProps = {
  meta?: {
    from: number | null;
    to: number | null;
  };
};

export default function Filter({ meta }: FilterProps) {
  const searchParams = useSearchParams();
  const updateQuery = useUpdateQuery();

  // local state (controlled inputs)
  const [from, setFrom] = useState(searchParams.get("price_from") || "");
  const [to, setTo] = useState(searchParams.get("price_to") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [sortOpen, setSortOpen] = useState(false); // custom select dropdown state
  const [filterOpen, setFilterOpen] = useState(false); // price filter dropdown state

  // keep UI in sync when navigating back/forward
  useEffect(() => {
    setFrom(searchParams.get("price_from") || "");
    setTo(searchParams.get("price_to") || "");
    setSort(searchParams.get("sort") || "");
  }, [searchParams]);

  const applyFilter = () => {
    updateQuery({
      price_from: from ? Number(from) : undefined,
      price_to: to ? Number(to) : undefined,
      page: 1, // reset pagination
    });
    setFilterOpen(false); // close filter dropdown after applying
  };

  const handleSort = (value: string) => {
    setSort(value);
    updateQuery({ sort: value, page: 1 });
    setSortOpen(false); // close dropdown after selection
  };

  const toggleSort = () => {
    setSortOpen((prev) => !prev);
    setFilterOpen(false);
  };
  const toggleFilter = () => {
    setFilterOpen((prev) => !prev);
    setSortOpen(false);
  };

  const sortLabel =
    sort === "-created_at"
      ? "New products first"
      : sort === "price"
      ? "Price, low to high"
      : sort === "-price"
      ? "Price, high to low"
      : "Sort by";

  return (
    <div className="h-[63px] flex justify-between items-center">
      <h1 className="font-semibold text-[#10151F] text-[42px]">Products</h1>

      <div className=" h-[24px] text-[#3E424A] flex items-center justify-between">
        {/* Showing results */}
        <p className="text-[12px] font-regular mr-[32px] ">
          {meta?.from && meta?.to
            ? `Showing ${meta.from}-${meta.to} of 200 results`
            : "Showing results"}
        </p>

        <div className="w-0 h-[14px] border border-[#E1DFE1] mr-[32px]"></div>

        {/* Filter inputs */}
        <div className="relative w-[64px] h-6 flex gap-2 mr-8 items-center">
          <div
            onClick={toggleFilter}
            className="flex gap-2 items-center cursor-pointer"
          >
            <Image
              src="/icons/filter.png"
              alt="filter icon"
              width={24}
              height={24}
            />
            <p className="text-[16px] font-[400]">Filter</p>
          </div>

          {filterOpen && (
            <div className="absolute flex  flex-col top-full w-[392px] h-[169px] -right-5 mt-1 bg-white border border-gray-300 rounded shadow-md p-4 z-10">
              <p className="text-[16px] font-[600] text-[#10151F] mb-5">
                Select price
              </p>
              <div className="flex gap-[10px] items-center  ">
                <div className="flex w-[175px] items-center h-[42px] text-[14px] font-[400] border border-[#E1DFE1] rounded-lg px-4 py-[10px]">
                  <label className="text-[#3E424A]">
                    From <span className="text-[#FF4000] ">*</span>
                  </label>
                  <input
                    type="number"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-14 px-3 no-arrows "
                  />
                </div>
                <div className="flex w-[175px] items-center h-[42px] text-[14px] font-[400] border border-[#E1DFE1] rounded-lg px-4 py-[10px]">
                  <label className="text-[#3E424A]">
                    To <span className="text-[#FF4000] ">*</span>
                  </label>
                  <input
                    type="number"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-18 px-3 no-arrows "
                  />
                </div>
              </div>
              <button
                onClick={applyFilter}
                className=" w-[124px] h-[41px] text-[14px] font-[400] bg-[#FF4000] border rounded-[10px] mt-[10px] cursor-pointer self-end  text-white"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Sort dropdown */}
        <div className="relative ">
          <button
            onClick={toggleSort}
            className="h-6  text-[16px] cursor-pointer font-[400] flex items-center gap-1 w-fit"
          >
            {sortLabel}
            <span className="text-xs">
              <ChevronDown />
            </span>
          </button>

          {sortOpen && (
            <div className="absolute z-10 w-[223px] h-[184px] top-full right-0 mt-1 bg-white border border-[#E1DFE1] p-4 rounded-lg text-[16px] font-[400]">
              <div
                className="mb-4 cursor-pointer font-[600] hover:bg-gray-100"
                onClick={() => handleSort("")}
              >
                Sort by
              </div>
              <div
                className="py-1 mb-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("-created_at")}
              >
                New products first
              </div>
              <div
                className="py-1 mb-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("price")}
              >
                Price, low to high
              </div>
              <div
                className="py-1 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("-price")}
              >
                Price, high to low
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
