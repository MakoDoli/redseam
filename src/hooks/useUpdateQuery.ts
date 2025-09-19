"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useUpdateQuery() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (params: Record<string, string | number | undefined>) => {
    const current = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === "") {
        current.delete(key);
      } else {
        current.set(key, String(value));
      }
    });

    router.push(`?${current.toString()}`);
  };
}
