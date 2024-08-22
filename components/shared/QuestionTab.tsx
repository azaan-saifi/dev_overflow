import { getUserQuestions } from "@/lib/actions/user.action";
import React from "react";
import QuestionCard from "../card/QuestionCard";
import Pagination from "./Pagination";
import { SearchParamsProps } from "@/types";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserQuestions({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      <div className="mt-2 flex flex-col gap-5">
        {result.questions.map((question) => (
          <QuestionCard
            key={question._id}
            clerkId={clerkId}
            _id={question._id}
            title={question.title}
            tags={question.tags}
            author={question.author}
            createdAt={question.createdAt}
            upvotes={question.upvotes}
            views={question.views}
            answers={question.answers}
          />
        ))}
      </div>
      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
};

export default QuestionTab;
