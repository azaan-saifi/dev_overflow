import { SearchParams } from "@/lib/actions/shared.types";
import { getUserQuestions } from "@/lib/actions/user.action";
import React from "react";
import QuestionCard from "../card/QuestionCard";

interface Props extends SearchParams {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserQuestions({
    userId,
    page: 1,
  });
  return (
    <div>
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
  );
};

export default QuestionTab;
