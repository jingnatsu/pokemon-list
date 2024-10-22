"use client";

import { LIMIT_ITEMS } from "@/app/page";
import { useRouter, useSearchParams } from "next/navigation";
import React, { memo } from "react";

interface PaginationProps {
  currentPage: number;
  total: number;
}

const Pagination = ({ currentPage, total }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const maxPage = Math.ceil(total / LIMIT_ITEMS);

  const handlePageChange = (newPage: number) => {
    const typeParams = searchParams
      .getAll("type")
      .map((t) => `type=${t}`)
      .join("&");
    router.push(`/?page=${newPage}${typeParams ? `&${typeParams}` : ""}`);
  };

  return (
    <div className="mt-8 flex justify-center">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none"
      >
        Prev
      </button>

      <button
        disabled={currentPage === maxPage || total === 0}
        onClick={() => handlePageChange(currentPage + 1)}
        className="p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none"
      >
        Next
      </button>
    </div>
  );
};

export default memo(Pagination);
