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
  };

  const handleSort = (value: string) => {
    setSort(value);
    updateQuery({ sort: value, page: 1 });
    setSortOpen(false); // close dropdown after selection
  };

  const toggleSort = () => setSortOpen((prev) => !prev);

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
        <p className="text-[12px] font-regular mr-[64px] ">
          {meta?.from && meta?.to
            ? `Showing ${meta.from}-${meta.to} of 200 results`
            : "Showing results"}
        </p>

        {/* Filter inputs */}
        <div className="w-[64px] h-6 flex gap-2 mr-8 items-center">
          <Image
            src="/icons/filter.png"
            alt="filter icon"
            width={24}
            height={24}
          />
          <p className="text-[16px] font-[400]">Filter</p>
          {/* price inputs */}
          {/* <div className="absolute">
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-[60px] border border-gray-300 rounded px-1 text-[12px]"
              />
              <input
                type="number"
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-[60px] border border-gray-300 rounded px-1 text-[12px]"
              />
              <button
                onClick={applyFilter}
                className="px-2 py-[2px] text-[12px] border rounded bg-gray-100 hover:bg-gray-200"
              >
                Apply
              </button>
            </div>
          </div> */}
        </div>

        {/* Sort dropdown */}
        <div className="relative ">
          <button
            onClick={toggleSort}
            className="h-6 text-[16px] font-[400] flex items-center gap-1 w-fit"
          >
            {sortLabel}
            <span className="text-xs">
              <ChevronDown />
            </span>
          </button>

          {sortOpen && (
            <div className="absolute z-10 w-[223px] h-[184px] top-full right-0 mt-1 bg-white border border-[#E1DFE1] p-4 rounded-lg text-[16px] font-[400]">
              <div
                className="  mb-4 cursor-pointer font-[600] hover:bg-gray-100"
                onClick={() => handleSort("")}
              >
                Sort by
              </div>
              <div
                className=" py-1  mb-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("-created_at")}
              >
                New products first
              </div>
              <div
                className=" py-1  mb-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("price")}
              >
                Price, low to high
              </div>
              <div
                className=" py-1 cursor-pointer hover:bg-gray-100"
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
