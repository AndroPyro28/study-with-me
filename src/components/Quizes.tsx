import { Answer, Question, Quiz } from "@prisma/client";
import React from "react";
import DateTimeFormatter from "~/helper/DateTimeFormatter.helper";
import { api } from "~/utils/api";
import AddQuizModal from "./AddQuizModal";
import { useRouter } from "next/router";
import Loader from "./Loader";

interface Props {
  handler: () => void,
  openAddQuizModal: boolean
}
const Quizes = ({handler, openAddQuizModal}: Props) => {
  const { data, isLoading, isError, isFetched} = api.quiz.getAllQuiz.useQuery();

  const QuizTableHeader = (
    <div className="flex justify-evenly text-white">
      <div className="flex-1 bg-gray-600 p-5 text-center">id</div>
      <div className="flex-1 bg-gray-600 p-5 text-center">Title</div>
      <div className="flex-1 bg-gray-600 p-5 text-center">Status</div>
      <div className="flex-1 bg-gray-600 p-5 text-center">Score</div>
      <div className="flex-1 bg-gray-600 p-5 text-center">Date Created</div>
    </div>
  );


  type QuizProps = {
    data: Quiz & {
      answer: Answer[];
      question: Question[];
    };
  };


  const router = useRouter();

  const QuizTableData = ({ data }: QuizProps) => {
    const { time, date } = DateTimeFormatter(data?.createdAt + "");
    return (
      <div className="flex cursor-pointer items-center justify-evenly text-white even:bg-gray-200" onClick={() => window.location.assign(`/quizes/${data.id}`)}>
        <div className="whitespace-wrap  flex-1 overflow-hidden text-ellipsis p-5 text-center text-gray-800">
          {data.id}
        </div>
        <div className="whitespace-wrap  flex-1 overflow-hidden text-ellipsis p-5 text-center text-gray-800">
          {data.title}
        </div>
        <div className="whitespace-wrap  flex-1 overflow-hidden text-ellipsis p-5 text-center text-gray-800">
          {!data?.isSubmitted ? data?.posted ? 'Ready' : 'Not Ready' : 'Submitted'}
        </div>
        <div className="whitespace-wrap  flex-1 overflow-hidden text-ellipsis p-5 text-center text-gray-800">
          {data?.isSubmitted ? `${data?.score} / ${data?.question?.length}` : `---`}
        </div>
        <div className="whitespace-wrap  flex-1 overflow-hidden text-ellipsis p-5 text-center text-gray-800">
          {date} {time}
        </div>
      </div>
    );
  };
  let content;

  const fetchQuizes = data?.map((quiz) => <QuizTableData data={quiz} />);

  if(isLoading && !isFetched) content = <Loader size={20} />
  if(!isLoading && isError) content = <div>Something went wrong...</div>
  if(!isLoading && isFetched) content = <>{fetchQuizes?.length! > 0 ? fetchQuizes : <div className="text-center m-10 text-xl font-bold">No quiz yet</div>}</>

  return (
    <div className="mt-[20px] flex h-auto flex-col rounded-md border bg-white w-[90vw]">
      { openAddQuizModal && <AddQuizModal handler={handler}/>}
      {QuizTableHeader}
      {content}
    </div>
  );
};

export default Quizes;
