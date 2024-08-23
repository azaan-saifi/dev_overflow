import JobCard from "@/components/card/JobCard";
import Filter from "@/components/shared/search/Filter";
import { LocalSearchbar } from "@/components/shared/search/LocalSearchbar";
import { TagFilters } from "@/constants/filter";
import React from "react";

const Jobs = () => {
  return (
    <section>
      <h1 className="h1-bold text-dark200_light800">Jobs</h1>
      <div className="mt-9 flex gap-5 max-sm:flex-col">
        <LocalSearchbar
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Job Title, Company, or Keywords"
          route="/jobs"
        />
        <Filter
          imgSrc="/assets/icons/location.svg"
          placeholder="Select location"
          filters={TagFilters}
          otherClasses="min-h-[56px]"
        />
      </div>
      <div className="mt-9 flex flex-col gap-5">
        <JobCard />
      </div>
    </section>
  );
};

export default Jobs;
