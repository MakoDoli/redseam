"use client";
import { useSearchParams } from "next/navigation";
import { useUpdateQuery } from "@/hooks/useUpdateQuery";

type PaginationProps = {
  meta: {
    current_page: number;
    per_page: number;
    from: number;
    to: number;
    total: number;
  };
};

export default function Pagination({ meta }: PaginationProps) {
  const searchParams = useSearchParams();
  const updateQuery = useUpdateQuery();

  const currentPage =
    Number(searchParams.get("page")) || meta.current_page || 1;
  const totalProducts = meta.total;
  const totalPages = Math.ceil(totalProducts / meta.per_page);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    updateQuery({ page });
  };

  const renderPageButton = (page: number) => (
    <button
      key={page}
      onClick={() => goToPage(page)}
      className={`px-3 text-[14px] py-1 size-8 border rounded cursor-pointer ${
        page === currentPage
          ? "border-[#FF4000] font-bold text-[#FF4000]"
          : "border-[#F8F6F7] hover:border-gray-500 text-[#212B36]"
      }`}
    >
      {page}
    </button>
  );

  const pages: (number | string)[] = [];

  // Always show first button
  pages.push(1);

  // Show second button  if current page is <= 4
  if (currentPage <= 4) {
    pages.push(2);
  }

  // ... before current range ( if current page > 4)
  if (currentPage > 4) {
    pages.push("...");
  }

  // Middle range: current-1, current, current+1
  // Only add these if they're not already included (i.e., if current page > 4)
  if (currentPage > 4) {
    const start = currentPage - 1;
    const end = Math.min(totalPages - 2, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  } else {
    // For pages 1-4, fill in the sequence after 2
    const start = 3;
    const end = Math.min(totalPages - 2, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }

  // ... AFTER current range
  if (currentPage < totalPages - 3) {
    pages.push("...");
  }

  // Always show last two buttons (if they exist and aren't already included)
  if (totalPages > 1 && !pages.includes(totalPages - 1)) {
    pages.push(totalPages - 1);
  }
  if (totalPages > 0 && !pages.includes(totalPages)) {
    pages.push(totalPages);
  }

  return (
    <div className="flex gap-2 mt-[90px] mb-[216px] items-center justify-center">
      <button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className="px-2 py-1 cursor-pointer disabled:opacity-50"
      >
        &lt;
      </button>

      {pages.map((p, i) =>
        typeof p === "number" ? (
          renderPageButton(p)
        ) : (
          <span key={`ellipsis-${i}`} className="px-2">
            ...
          </span>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="px-2 py-1 cursor-pointer disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
}
