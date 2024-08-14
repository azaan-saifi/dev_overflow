import Profile from "@/components/form/Profile";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Page = async () => {
  const { userId: clerkId } = auth();
  const mongoUser = await getUserById({ userId: clerkId });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900 mb-2">Edit Profile</h1>
      <Profile clerkId={clerkId} user={JSON.stringify(mongoUser)} />
    </>
  );
};

export default Page;
