import { createTRPCRouter, privateProcedure, } from "~/server/api/trpc";
import z from 'zod'
import { createOneQuestionaire, deleteOneQuestionaire, getAllQuestionaireByQuizId, } from "~/models";
import { addQuestionaireDto } from "./dto/insertQuestionaire.dto";
import { deleteQuestionaireDto } from "./dto/deleteQuestionaire.dto";

export const questionaireRouter = createTRPCRouter({
    createOneQuestionaire: privateProcedure.input(addQuestionaireDto).mutation(async ({ctx, input}) => {
        const questionaire = await createOneQuestionaire(input, ctx.currentUser.id);
        return questionaire
    }),
    getAllQuestionaireByQuizId: privateProcedure.input(z.string()).query(async({input, ctx}) => {
        const questionaires = await getAllQuestionaireByQuizId(input, ctx.currentUser.id);
        return questionaires
    }),
    deleteOneQuestionaireByQuizId: privateProcedure.input(deleteQuestionaireDto).mutation(async({input, ctx}) => {
        return await deleteOneQuestionaire(input)
    }),
    
});
