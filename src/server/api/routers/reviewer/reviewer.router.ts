import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";
import { noteSchema } from "~/components/AddNoteModal";
import { createOneReviewer, findAllReviewerByUserId } from "~/models/reviewer.model";

export const reviewerRouter = createTRPCRouter({
    createReviewer: privateProcedure.input(noteSchema).mutation(async({ctx, input}) => {
        const reviewer = await createOneReviewer(input, ctx.currentUser.id)
        return reviewer
    }),
    getAllReviewer: privateProcedure.query(async ({ctx}) => {
        const reviewerList = await findAllReviewerByUserId(ctx.currentUser.id);
        return reviewerList
    })
});
