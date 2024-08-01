import QuestionCard from "@/components/card/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import Filter from "@/components/shared/search/Filter";
import { LocalSearchbar } from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import Link from "next/link";
import React from "react";

const questions = [
  {
    _id: "1",
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    tags: [
      { _id: "1", name: "Nextjs" },
      { _id: "2", name: "Reactjs" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      picture: "https://via.placeholder.com/150",
    },
    answers: [
      {
        _id: "1",
        content: "You can use getServerSideProps for SSR in Next.js.",
      },
      { _id: "2", content: "Another approach is to use SWR library with SSR." },
    ],
    views: 120000,
    upvotes: 10,
    createdAt: new Date("2024-08-1"),
  },
  {
    _id: "2",
    title: "Is it only me or the font is bolder than necessary?",
    tags: [
      { _id: "3", name: "Css" },
      { _id: "4", name: "Html" },
    ],
    author: {
      _id: "2",
      name: "John Doe",
      picture: "https://via.placeholder.com/150",
    },
    answers: [
      {
        _id: "1",
        content:
          "You might want to check the font-weight property in your CSS.",
      },
      {
        _id: "2",
        content:
          "Also, make sure there are no conflicting styles from parent elements.",
      },
    ],
    views: 120,
    upvotes: 10,
    createdAt: new Date("2024-03-30"),
  },
];

const Home = () => {
  return (
    <>
      <div className="-mt-2 flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href={"/ask-question"} className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
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
            title="There's no question to show"
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

export default Home;
