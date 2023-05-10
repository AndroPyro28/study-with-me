import { Answer, Choice, Question, Quiz } from "@prisma/client";
import React, { SetStateAction, useEffect } from "react";

interface Props {
  data:
    | (Quiz & {
        question: (Question & {
          choice: Choice[];
        })[];
        answer: Answer[];
      })
    | null;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  answer: string;
  setAnswer: React.Dispatch<SetStateAction<string>>;
}

const AnswerInputType = ({
  data,
  currentPage,
  setCurrentPage,
  answer,
  setAnswer,
}: Props) => {
  const questions = data?.question;

  const handleChange = (value: string) => {
    setAnswer(value);
  };

  // useEffect(() => {
  //   if(!answer) {
  //     setAnswer(data?.question[currentPage]?.dedicated_answer as string)
  //   }
  // }, [currentPage, answer])

  if (questions![currentPage]?.objective_test_type === "ENUMERATION") {
    return (
      <div className="mt-10 flex flex-col">
        <input
          type="text"
          placeholder="Answer here"
          className="w-[50%] rounded-md border px-[10px] py-[15px] outline-none"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAnswer((prev) => e.target.value)
          }
          value={answer}
        />
      </div>
    );
  }
  if (questions![currentPage]?.objective_test_type === "MULTIPLE_CHOICES") {
    return (
      <div className="mt-10 flex flex-col gap-5">
        {questions![currentPage]?.choice.map((choice) => {
          return (
            <div
              className={`w-[10%] cursor-pointer gap-1  text-center ${
                answer == choice.choice ? ` bg-[rgb(177,208,210)] ` : ` bg-red-100 `
              } rounded-md hover:bg-[#EAEAEA]`}
              onClick={() => handleChange(choice.choice)}
            >
              <span className="m-1 text-2xl">{choice.choice}</span>
            </div>
          );
        })}
      </div>
    );
  }

  if (questions![currentPage]?.objective_test_type === "TRUE_OR_FALSE") {
    return (
      <div className="mt-10 flex flex-col gap-5">
        <div
          className={`w-[10%] cursor-pointer gap-1  text-center ${
            answer == 'TRUE' ? ` bg-[rgb(177,208,210)] ` : ` bg-red-100 `
          } rounded-md hover:bg-[#EAEAEA]`}
          onClick={() => handleChange("TRUE")}
        >
          <span className="m-1 text-2xl">{"True"}</span>
        </div>

        <div
          className={`w-[10%] cursor-pointer gap-1  text-center ${
            answer == 'FALSE' ? ` bg-[rgb(177,208,210)] ` : ` bg-red-100 `
          } rounded-md hover:bg-[#EAEAEA]`}
          onClick={() => handleChange("FALSE")}
        >
          <span className="m-1 text-2xl">{"false"}</span>
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default AnswerInputType;
