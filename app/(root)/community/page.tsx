import CommunityCard from "@/components/card/CommunityCard";
import Filter from "@/components/shared/search/Filter";
import { LocalSearchbar } from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filter";
import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";
import React from "react";

const Community = async () => {
  const result = await getAllUsers({});

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
          <div>
            <p>No users yet</p>
            <Link href={"/sign-up"} className="mt-2 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Community;
