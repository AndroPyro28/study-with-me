import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import z from "zod";
import { addQuizDto } from "~/components/AddQuizModal";
import {
  createOneQiuz,
  deleteQuiz,
  findAllQuizByUserId,
  getQuizById,
  postQUiz,
  submitQuiz,
} from "~/models";
import { submitAnswerDto } from "../answer/dto/submitAnswer.dto";
import {
  findAnswerByQuizIdAndQuestionId,
  submitAnswer,
  updateAnswer,
} from "~/models/answer.model";

export const quizRouter = createTRPCRouter({
  createOneQuiz: privateProcedure
    .input(addQuizDto)
    .mutation(async ({ ctx, input }) => {
      const quiz = createOneQiuz(input, ctx.currentUser.id);
      return quiz;
    }),
  getAllQuiz: privateProcedure.query(async ({ ctx }) => {
    const quizes = findAllQuizByUserId(ctx.currentUser.id);
    return quizes;
  }),
  postQuiz: privateProcedure
    .input(z.string().cuid())
    .mutation(async ({ ctx, input }) => {
      return postQUiz(input, ctx.currentUser.id);
    }),
  getQuizById: privateProcedure
    .input(z.string().cuid())
    .query(async ({ ctx, input }) => {
      const quiz = await getQuizById(input, ctx.currentUser.id);
      return quiz;
    }),
  quizMarkSubmitted: privateProcedure
    .input(submitAnswerDto)
    .mutation(async ({ ctx, input }) => {
      const answerData = await findAnswerByQuizIdAndQuestionId(
        input.questionId,
        input.quizId,
        ctx.currentUser.id
      );
      if (!answerData) {
        // if not answered yet then create one
        const answerCreated = await submitAnswer(input, ctx.currentUser.id);
      } else {
        // if answer has been already created then we will update the current answer
        const answerUpdated = await updateAnswer(answerData.id, input.answer);
      }

      const quiz = await getQuizById(input.quizId, ctx.currentUser.id);

      const answer = quiz?.answer;
      const question = quiz?.question;

      const totalScore = question?.reduce((totalScore, question) => {
        const answeredQuestion = answer?.find(
          (ans) => ans.question_id == question.id
        );
        return answeredQuestion?.answer.toLocaleLowerCase() ===
          question.dedicated_answer.toLocaleLowerCase()
          ? totalScore + 1
          : totalScore;
      }, 0);

      const quizSubmitted = await submitQuiz(quiz?.id!, totalScore ?? 0);

      return quizSubmitted;
    }),
    deleteQuiz: privateProcedure.input(z.string().cuid()).mutation(async ({input, ctx}) => {
      const deletedQuiz = await deleteQuiz(input, ctx.currentUser.id);
      console.log(deletedQuiz)
      return deletedQuiz
    })
});
