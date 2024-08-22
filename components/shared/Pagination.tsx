"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

interface Props {
  pageNumber: number;
  isNext: boolean;
}

const Pagination = ({ pageNumber, isNext }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });
    router.push(newUrl);
  };

  if (!isNext && pageNumber === 1) return null;

  return (
    <div className="flex-center mt-7 w-full">
      <div className="flex-center gap-2">
        <Button
          disabled={pageNumber === 1}
          className="h2-bold text-dark100_light900 background-light700_dark300 light-border-2 border px-4 py-2"
          onClick={() => handleNavigation("prev")}
        >
          Prev
        </Button>
        <p className="body-medium text-dark100_light900 light-border-2 rounded-lg border bg-primary-500 px-3.5 py-2">
          {pageNumber}
        </p>
        <Button
          disabled={!isNext}
          className="h2-bold text-dark100_light900 background-light700_dark300 light-border-2 border px-4 py-2"
          onClick={() => handleNavigation("next")}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
