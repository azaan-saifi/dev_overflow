import JobCard from "@/components/card/JobCard";
import Pagination from "@/components/shared/Pagination";
import Filter from "@/components/shared/search/Filter";
import { LocalSearchbar } from "@/components/shared/search/LocalSearchbar";
import { getCountryNames, getJobs } from "@/lib/actions/jobs.action";
import { SearchParamsProps } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Jobs | DevOverflow",
};

const Jobs = async ({ searchParams }: SearchParamsProps) => {
  const { response, isNext }: any = await getJobs({
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
    location: searchParams.location,
  });

  const countries = await getCountryNames();

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
          filters={countries}
          otherClasses="min-h-[56px]"
          filterType="location"
        />
      </div>

      <div className="mt-9 flex flex-col gap-5">
        {response?.data?.map((job: any) => (
          <JobCard
            key={job.job_id}
            imgSrc={job.employer_logo || "/assets/images/site-logo.svg"}
            title={job.job_title}
            description={job.job_description}
            employmentType={job.job_employment_type}
            applyLink={job.job_apply_link}
            employerWebsite={job.employer_website || "/"}
          />
        ))}
      </div>
      <Pagination
        pageNumber={searchParams.page ? +searchParams.page : 1}
        isNext={isNext || false}
      />
    </section>
  );
};

export default Jobs;
