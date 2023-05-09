import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { objective_test_type } from "@prisma/client";
import { optional } from "zod";
import styles from "./styles.module.css";
import { Input } from "postcss";

const quizDetail = () => {
  const { query } = useRouter();

  const QuestionaireCreateContainer = () => {
    const [choicePopulate, setChoicePopulate] = useState<string[]>([]);
    const [choice1, setChoice1] = useState("");
    const [choice2, setChoice2] = useState("");
    const [choice3, setChoice3] = useState("");
    const [choice4, setChoice4] = useState("");
    const [answer, setAnswer] = useState<string>("");
    const selectObjectiveType: objective_test_type[] = [
      "ENUMERATION",
      "MULTIPLE_CHOICES",
      "TRUE_OR_FALSE",
    ];

    const [selectedType, setSelectedType] = useState<objective_test_type>();

    let answerInputType: any = null;

    if (selectedType?.length! > 0) {
      if (selectedType === "ENUMERATION") {
        answerInputType = (
          <>
            <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnswer(e.target.value)}
              type="text"
              placeholder="Answer Here"
              className={styles.answerQuestionaire}
            />
          </>
        );
      } else if (selectedType === "TRUE_OR_FALSE") {
        answerInputType = (
          <>
            <select className={styles.answerQuestionaire} name="" id="" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAnswer(e.target.value)}>
              <option value="" id="True">
                Select Answer
              </option>
              <option value="TRUE" id="True">
                True
              </option>
              <option value="FALSE" id="False">
                False
              </option>
            </select>
          </>
        );
      } else if (selectedType === "MULTIPLE_CHOICES") {
        answerInputType = (
          <select className={styles.answerQuestionaire} name="" id=""  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAnswer(e.target.value)}>
            <option value="" id="True">
              Select Answer
            </option>
            {choice1 && <option value={choice1}>{choice1}</option>}
            {choice2 && <option value={choice2}>{choice2}</option>}
            {choice3 && <option value={choice3}>{choice3}</option>}
            {choice4 && <option value={choice4}>{choice4}</option>}
          </select>
        );
      }
    }

    const removeChoice = (index: number) => {
        
    }

    return (
      <div className="h-[80vh] w-[70vw] rounded-lg bg-white shadow-xl">
        <div className="flex justify-between gap-5 p-5">
          <FontAwesomeIcon
            icon={faQuestion}
            className="flex w-[20px] items-center justify-center rounded-full bg-[rgb(32,77,67)] p-5 text-white"
          />{" "}
          <input
            type="text"
            placeholder="Question Here"
            className={styles.inputQuestionaire}
          />
          <select
            name=""
            id=""
            className={styles.selectType}
            value={selectedType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedType(e.target.value as objective_test_type)
            }
          >
            <option value={"" as objective_test_type}>Select Type</option>

            {selectObjectiveType?.map((type) => (
              <option value={type} id={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {answerInputType}

        {selectedType === "MULTIPLE_CHOICES" && (
          <div className="flex flex-col justify-center">
            {choicePopulate.length >= 1 && (
              <div className="mt-10 flex h-[60px] w-[83%] items-center gap-2">
                <input
                  type="text"
                  className={styles.inputChoices}
                  placeholder={`(Choice no 1)`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setChoice1(e.target.value)
                  }
                />{" "}
                <FontAwesomeIcon
                  icon={faClose}
                  className="h-[30px] w-[30px] cursor-pointer rounded-full text-sm text-red-500"
                />
              </div>
            )}

            {choicePopulate.length >= 2 && (
              <div className="mt-10 flex h-[60px] w-[83%] items-center gap-2">
                <input
                  type="text"
                  className={styles.inputChoices}
                  placeholder={`(Choice no 2)`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setChoice2(e.target.value)
                  }
                />{" "}
                <FontAwesomeIcon
                  icon={faClose}
                  className="h-[30px] w-[30px] cursor-pointer rounded-full text-sm text-red-500"
                />
              </div>
            )}

            {choicePopulate.length >= 3 && (
              <div className="mt-10 flex h-[60px] w-[83%] items-center gap-2">
                <input
                  type="text"
                  className={styles.inputChoices}
                  placeholder={`(Choice no 3)`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setChoice3(e.target.value)
                  }
                />{" "}
                <FontAwesomeIcon
                  icon={faClose}
                  className="h-[30px] w-[30px] cursor-pointer rounded-full text-sm text-red-500"
                />
              </div>
            )}

            {choicePopulate.length >= 4 && (
              <div className="mt-10 flex h-[60px] w-[83%] items-center gap-2">
                <input
                  type="text"
                  className={styles.inputChoices}
                  placeholder={`(Choice no 3)`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setChoice4(e.target.value)
                  }
                />{" "}
                <FontAwesomeIcon
                  icon={faClose}
                  className="h-[30px] w-[30px] cursor-pointer rounded-full text-sm text-red-500"
                />
              </div>
            )}

            {choicePopulate.length < 3 && (
              <div
                className="mr-20 mt-20 flex cursor-pointer gap-1 self-end rounded-md bg-[#EAEAEA] px-5 py-3"
                onClick={() => setChoicePopulate((prev) => [...prev, ""])}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  className="h-[20px] w-[20px]  text-gray-500"
                />
                Question
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const QuestionaireListContainer = () => {
    return (
      <div className="h-[80vh] w-[30vw] rounded-lg bg-white shadow-xl"></div>
    );
  };

  return (
    <div className="flex h-[100vh] items-center gap-10 overflow-hidden bg-[rgb(222,223,232)] px-10">
      <QuestionaireCreateContainer />
      <QuestionaireListContainer />
    </div>
  );
};

export default quizDetail;
