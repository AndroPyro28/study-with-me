import { createTRPCRouter, privateProcedure, } from "~/server/api/trpc";
import z from 'zod'
import { addQuizDto } from "~/components/AddQuizModal";
import { createOneQiuz, findAllQuizByUserId, postQUiz } from "~/models";

export const quizRouter = createTRPCRouter({
    createOneQuiz: privateProcedure.input(addQuizDto).mutation(async ({ctx, input}) => {
        const quiz = createOneQiuz(input, ctx.currentUser.id);
        return quiz
    }),
    getAllQuiz: privateProcedure.query(async ({ctx}) => {
        const quizes = findAllQuizByUserId(ctx.currentUser.id);

        return quizes
    }),
    postQuiz: privateProcedure.input(z.string().cuid()).mutation( async ({ctx, input}) => {
        return postQUiz(input, ctx.currentUser.id)
    })
});
