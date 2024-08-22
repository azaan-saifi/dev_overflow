import Question from "@/components/form/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Page = async ({ params }: ParamsProps) => {
  const { userId } = auth();
  if (!userId) return null;

  const mongoUser = await getUserById({ userId });

  const question = await getQuestionById({ questionId: params.id });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 mb-5">Edit Page</h1>

      <Question
        type="edit"
        mongoUserId={mongoUser._id}
        questionDetails={JSON.stringify(question)}
      />
    </>
  );
};

export default Page;
