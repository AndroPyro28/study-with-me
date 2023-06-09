import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";
import { noteSchema } from "~/components/AddNoteModal";
import { createOneReviewer, deleteOneReviewer, findAllReviewerByUserId, findOneReviewerByUserId, updateOneReviewer } from "~/models/reviewer.model";
import z from 'zod'
import { updateReviewerSchema } from "~/components/Timer";
export const reviewerRouter = createTRPCRouter({
    createReviewer: privateProcedure.input(noteSchema).mutation(async({ctx, input}) => {
        const reviewer = await createOneReviewer(input, ctx.currentUser.id)
        return reviewer
    }),
    getAllReviewer: privateProcedure.input(z.string()).query(async ({ctx, input}) => {
        const reviewerList = await findAllReviewerByUserId(ctx.currentUser.id, input);
        return reviewerList
    }),
    getReviewerById: privateProcedure.input(z.string()).query(async({ctx, input}) => {
        const reviewer = await findOneReviewerByUserId(input, ctx.currentUser.id)      
        return reviewer 
    }),
    updateReviewer: privateProcedure.input(updateReviewerSchema).mutation(async({ctx, input}) => {
        const reviewer = await updateOneReviewer(input, ctx.currentUser.id );
        return reviewer;
    }),
    deleteReviewer: privateProcedure.input(z.string().cuid()).mutation(async({ctx, input}) => {
        const reviewer = await deleteOneReviewer(input, ctx.currentUser.id );
        return reviewer;
    })
});
