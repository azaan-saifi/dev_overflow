import CommunityCard from "@/components/card/CommunityCard";
import Pagination from "@/components/shared/Pagination";
import Filter from "@/components/shared/search/Filter";
import { LocalSearchbar } from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filter";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import React from "react";

const Community = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <div className="flex flex-col gap-5">
      <h1 className="h1-bold text-dark200_light800">All Users</h1>
      <div className="mt-5 flex gap-4">
        <LocalSearchbar
          route="/community"
          otherClasses="flex-1"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search amazing minds here"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-5 flex flex-wrap gap-5">
        {result.allUsers.length > 0 ? (
          result.allUsers.map((user) => (
            <CommunityCard
              key={user._id}
              id={user._id}
              clerkId={user.clerkId}
              name={user.name}
              username={user.username}
              picture={user.picture}
            />
          ))
        ) : (
          <div className="flex w-full flex-col items-center justify-center">
            <p className="paragraph-regular text-dark200_light800">
              No users yet
            </p>
            <Link href={"/sign-up"} className="mt-2 font-bold text-accent-blue">
              Join to be the first 🚀
            </Link>
          </div>
        )}
      </section>
      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </div>
  );
};

export default Community;
