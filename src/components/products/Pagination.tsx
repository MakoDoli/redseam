"use client";

import { useSearchParams } from "next/navigation";
import { useUpdateQuery } from "@/hooks/useUpdateQuery";

export default function Pagination() {
  const searchParams = useSearchParams();
  const updateQuery = useUpdateQuery();

  const page = Number(searchParams.get("page")) || 1;

  const goToPage = (newPage: number) => {
    updateQuery({ page: newPage });
  };

  return (
    <div className="flex gap-2 mt-4">
      <button
        disabled={page === 1}
        onClick={() => goToPage(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="px-3 py-1">Page {page}</span>
      <button
        onClick={() => goToPage(page + 1)}
        className="px-3 py-1 border rounded"
      >
        Next
      </button>
    </div>
  );
}
