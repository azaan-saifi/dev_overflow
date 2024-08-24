"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
import Image from "next/image";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
  placeholder?: string;
  imgSrc?: string;
  filterType?: string;
}

const Filter = ({
  filters,
  otherClasses,
  containerClasses,
  placeholder = "Select a Filter",
  imgSrc,
  filterType = "filter",
}: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramFilter = searchParams.get(filterType);

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: filterType,
      value,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <div className={`relative ${containerClasses}`}>
        <Select
          onValueChange={handleUpdateParams}
          defaultValue={paramFilter || undefined}
        >
          <SelectTrigger
            className={`${otherClasses}
        body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
          >
            <div className="line-clamp-1 flex flex-1 gap-2 text-left">
              {imgSrc && (
                <Image
                  src={imgSrc}
                  alt="icon"
                  height={20}
                  width={20}
                  className="invert-colors"
                />
              )}
              <SelectValue placeholder={placeholder} />
            </div>
          </SelectTrigger>
          <SelectContent className="background-light900_dark200 light-border-2">
            <SelectGroup>
              {filters.map((filter) => (
                <SelectItem
                  className="text-dark500_light700 hover:background-light800_dark400"
                  key={filter.value}
                  value={filter.value}
                >
                  {filter.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default Filter;
