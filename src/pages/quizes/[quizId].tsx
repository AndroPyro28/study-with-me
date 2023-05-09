import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { objective_test_type } from "@prisma/client";
import { optional } from "zod";
import styles from "./styles.module.css";
import { Input } from "postcss";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import useAuth from "~/hooks/useAuth";
import Loader from "~/components/Loader";

const quizDetail = () => {
  useAuth();
  const { query } = useRouter();
  const context = api.useContext();
const router = useRouter()
const [displayConfirmModal, setDisplayConfirmModal] = useState(false);

  const QuestionaireCreateContainer = () => {
    const [choicePopulate, setChoicePopulate] = useState<string[]>([]);
    const [answer, setAnswer] = useState<string>("");
    const [question, setQuestion] = useState("");
    const selectObjectiveType: objective_test_type[] = [
      "ENUMERATION",
      "MULTIPLE_CHOICES",
      "TRUE_OR_FALSE",
    ];

    const [selectedType, setSelectedType] = useState<objective_test_type>();
    const { mutate: mutateAdd } =
      api.questionaire.createOneQuestionaire.useMutation({
        onSettled: () => {
          setChoicePopulate([]);
          setAnswer("");
          setQuestion("");
          context.questionaire.getAllQuestionaireByQuizId.invalidate();
        },
      });

    const insertQuestionaire = () => {
      if (!answer || !question)
        return toast("You must fill the answer and question");
      const isChoiceFilled = choicePopulate.every((value) => value != "");
      if (
        selectedType === "MULTIPLE_CHOICES" &&
        !isChoiceFilled &&
        choicePopulate.length < 4
      ) {
        return toast("You must fill choices");
      }

      mutateAdd({
        question,
        answer,
        choices: choicePopulate,
        quizId: query!.quizId as string,
        objective_test_Type: selectedType as unknown as objective_test_type,
      });
    };

    let answerInputType: any = null;
    const changeValues = (targetIndex: number, targetValue: string) => {
      setChoicePopulate((prev) =>
        prev.map((value, index) => {
          if (index !== targetIndex) return value;
          return targetValue;
        })
      );
    };
    if (selectedType?.length! > 0) {
      if (selectedType === "ENUMERATION") {
        answerInputType = (
          <>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAnswer(e.target.value)
              }
              type="text"
              placeholder="Answer Here"
              className={styles.answerQuestionaire}
              value={answer}
            />
          </>
        );
      } else if (selectedType === "TRUE_OR_FALSE") {
        answerInputType = (
          <>
            <select
              className={styles.answerQuestionaire}
              name=""
              id=""
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setAnswer(e.target.value)
              }
              value={answer}
            >
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
          <select
            className={styles.answerQuestionaire}
            name=""
            id=""
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setAnswer(e.target.value)
            }
            value={answer}
          >
            <option value="" id="True">
              Select Answer
            </option>
            {choicePopulate.map((value, index) => (
              <option value={value} key={value + index}>
                {value}
              </option>
            ))}
          </select>
        );
      }
    }

    const removeChoice = (targetIndex: number) => {
      setChoicePopulate((prev) =>
        prev.filter((value, index) => index !== targetIndex)
      );
    };

    return (
      <div className="h-[80vh] w-[70vw] rounded-lg bg-white shadow-xl">
        <div className="flex justify-between gap-5 p-5">
          <div className="flex items-center justify-center rounded-full  bg-[rgb(32,77,67)] p-2 text-sm text-white">
            <FontAwesomeIcon
              icon={faQuestion}
              className="flex h-[30px] w-[30px] items-center justify-center text-sm font-bold"
            />{" "}
          </div>

          <input
            type="text"
            placeholder="Question Here"
            className={styles.inputQuestionaire}
            value={question}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuestion(e.target.value)
            }
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
            {choicePopulate.map((value, index) => (
              <div className="mt-10 flex h-[60px] w-[83%] items-center gap-2">
                <input
                  type="text"
                  className={styles.inputChoices}
                  placeholder={`(Choice no ${index + 1})`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    changeValues(index, e.target.value)
                  }
                  value={value}
                />{" "}
                <FontAwesomeIcon
                  icon={faClose}
                  onClick={() => removeChoice(index)}
                  className="h-[30px] w-[30px] cursor-pointer rounded-full text-sm text-red-500"
                />
              </div>
            ))}

            {choicePopulate.length < 4 && (
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

        <button
          className="mx-auto mt-10 flex w-fit self-center rounded-md bg-[rgb(55,148,83)] px-[20px] py-[10px] text-white"
          onClick={insertQuestionaire}
        >
          Insert Questionare
        </button>
      </div>
    );
  };

  const QuestionaireListContainer = () => {
    const { data, isLoading } =
      api.questionaire.getAllQuestionaireByQuizId.useQuery(
        query?.quizId! as string
      );
    const { mutate: mutateDelete } =
      api.questionaire.deleteOneQuestionaireByQuizId.useMutation({
        onSettled: () => {
          context.questionaire.getAllQuestionaireByQuizId.invalidate();
        },
      });

    if (isLoading) return <div> </div>;

    const deleteQuestionaire = (id: string) => {
      const aggree = window.confirm(
        "are you sure you want to delete this questionaire?"
      );
      if (aggree)
        return mutateDelete({
          id,
          quizId: query.quizId as string,
        });
    };

    const fetchQuestionairesCreated = data?.map((questionaire) => {
      return (
        <section
          className="flex cursor-pointer justify-evenly px-1 py-10 text-[1.5em] hover:bg-gray-200"
          onClick={() => deleteQuestionaire(questionaire.id)}
        >
          <div className={styles.answerData}>
            {questionaire.objective_test_type.replaceAll("_", " ")}
          </div>
          <div className={styles.answerData}>{questionaire.question}</div>
          <div className={styles.answerData}>
            {questionaire.dedicated_answer}
          </div>
        </section>
      );
    });
    

    const handleDisplayModal = () => setDisplayConfirmModal(prev => !prev)

    return (
      <div className="flex h-[80vh] w-[30vw] flex-col rounded-lg bg-white py-[20px] text-black shadow-xl">
        

        {
          displayConfirmModal && <ConfirmModal handleDisplayModal={handleDisplayModal}/>
        }
        <h1 className="py-5 text-center text-4xl font-bold">
          Questionaires Created
        </h1>

        <section className="flex justify-evenly bg-black py-5 text-3xl text-white ">
          <div className="flex flex-1 justify-center">Type</div>
          <div className="flex flex-1 justify-center">Question</div>
          <div className="flex flex-1 justify-center">Answer</div>
        </section>

        <div className="flex h-[55vh] flex-col">
          {isLoading ? (
            <Loader size={30} />
          ) : fetchQuestionairesCreated?.length! > 0 ? (
            fetchQuestionairesCreated
          ) : (
            <div className="m-10 text-center text-2xl text-gray-400">
              No questionaires created
            </div>
          )}
        </div>
        <button className="mx-auto w-[80%] rounded-xl bg-[rgb(94,162,242)] px-10 py-3 text-2xl text-white" onClick={handleDisplayModal}>
          Confirm
        </button>
      </div>
    );
  };

  interface ConfirmModalProps {
    handleDisplayModal: () => void
  }
  const ConfirmModal = ({handleDisplayModal}: ConfirmModalProps) => {

    const {mutate: mutatePost} = api.quiz.postQuiz.useMutation({
      onSettled: () => {
        router.push('/quizes')
      }
    })
    const postQuiz = () => {
      handleDisplayModal()
      mutatePost(query.quizId as string);
    }

    return (
      <div id="popup-modal" className={styles.modal}>
        <div className="absolute bottom-0 left-0 right-0 top-0 m-auto h-fit max-h-full w-full max-w-md">
          <div className="relative  rounded-lg bg-white shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="popup-modal"
              onClick={handleDisplayModal}

            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg
                className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to post this quiz?
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="mr-2 inline-flex items-center rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                onClick={postQuiz}
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
                onClick={handleDisplayModal}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-[95vh] items-center gap-10 overflow-hidden bg-[rgb(222,223,232)] px-10">
      <QuestionaireCreateContainer />
      <QuestionaireListContainer />
      {/* <ConfirmModal /> */}
    </div>
  );
};

export default quizDetail;
