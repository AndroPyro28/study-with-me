import {
  Answer,
  Choice,
  Question,
  Quiz,
  objective_test_type,
} from "@prisma/client";
import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import AnswerInputType from "./AnswerInputType";
import Loader from "./Loader";
import LoaderModal from "./LoaderModal";

interface Props {
  data:
    | (Quiz & {
        question: (Question & {
          choice: Choice[];
        })[];
        answer: Answer[];
      })
    | null;
}

function AnswerQuiz({ data }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

  const isNotInMaxPage = currentPage < data?.question.length! - 1;
  const context = api.useContext();
  const {mutate: mutateSubmitQuestionaire } = api.answer.submitAnswer.useMutation(
    {
      onSettled: () => {
        setAnswer(prev => '')
        context.quiz.getQuizById.invalidate()
      }
    }
  );

  const {mutate: mutateSubmitQuiz} = api.quiz.quizMarkSubmitted.useMutation({
    onMutate: () => {
      setLoading(true)
    },
    onSettled: () => {
      setAnswer(prev => '')
      window.location.reload();
    }
  })

  const handlePage = (action: "inc" | "dec") => {
    setCurrentPage((prev) => {
      if (action === "inc" && isNotInMaxPage) return prev + 1;
      if (action === "dec" && currentPage + 1 > 1) return prev - 1;
      return prev;
    });

    mutateSubmitQuestionaire({
      quizId: data?.id as string,
      questionId: data?.question[currentPage]?.id as string,
      answer
    });
  };

  const handleSubmitQuiz = () => {
    mutateSubmitQuestionaire({
      quizId: data?.id as string,
      questionId: data?.question[currentPage]?.id as string,
      answer
    });
      mutateSubmitQuiz({
        quizId: data?.id as string,
      questionId: data?.question[currentPage]?.id as string,
      answer
      })
  }

  return (
    <div className="flex h-[95vh] w-[100vw] items-center justify-center bg-[rgb(222,223,232)]">
      {
        loading && <LoaderModal />
      }
      <div className="relative flex h-[70vh] w-[70vw] flex-col rounded-lg bg-white shadow-2xl">
        <div className="mt-20 flex w-[80%] flex-col self-center">
          <h1 className="mt-10 text-3xl">
            {currentPage + 1}). {data?.question[currentPage]?.question}
          </h1>
          <AnswerInputType data={data} 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          answer={answer}
          setAnswer={setAnswer}
          />
        </div>

        <div className="absolute bottom-10 right-10 gap-5">
          {currentPage + 1 > 1 && (
            <button
              className="m-1 rounded-md bg-gray-400 px-[10px] py-[5px]"
              onClick={() => handlePage("dec")}
            >
              Prev
            </button>
          )}

          {isNotInMaxPage ? (
            <button
              className="m-1 rounded-md bg-gray-400 px-[10px] py-[5px] disabled:bg-[#EAEAEA]"
              onClick={() => handlePage("inc")}
              disabled={answer === ''}
            >
              Next
            </button>
          ) : (
            <button className="m-1 rounded-md bg-gray-400 px-[10px] py-[5px]" onClick={handleSubmitQuiz}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnswerQuiz;
