import { createTRPCRouter, privateProcedure, } from "~/server/api/trpc";
import { addQuizDto } from "~/components/AddQuizModal";
import { createOneQiuz, findAllQuizByUserId, getQuizById, postQUiz } from "~/models";
import { submitAnswerDto } from "./dto/submitAnswer.dto";
import { findAnswerByQuizIdAndQuestionId, submitAnswer, updateAnswer } from "~/models/answer.model";

export const answerRouter = createTRPCRouter({
    submitAnswer: privateProcedure.input(submitAnswerDto).mutation(async ({ctx, input}) => {
        const answer = await findAnswerByQuizIdAndQuestionId(input.questionId,input.quizId, ctx.currentUser.id);
        if(!answer){   // if not answered yet then create one
            const answerCreated = await submitAnswer(input, ctx.currentUser.id);
            return answerCreated;
        } else { // if answer has been already created then we will update the current answer
            const answerUpdated = await updateAnswer(answer.id, input.answer);
            return answerUpdated
        }
    })
});
