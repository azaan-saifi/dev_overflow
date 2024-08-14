import QuestionCard from "@/components/card/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { LocalSearchbar } from "@/components/shared/search/LocalSearchbar";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";
import React from "react";

const TagDetails = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    searchQuery: searchParams.query,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              createdAt={question.createdAt}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
            />
          ))
        ) : (
          <NoResult
            title="There's no tag to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. Your query could be the next big thing others learn from.
        Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default TagDetails;
