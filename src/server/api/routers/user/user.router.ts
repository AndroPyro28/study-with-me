import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { createUserOne, findUserByEmail, updateUser } from "~/models/user.model";
import { updateProfileDto } from "~/pages/profile";

export const userRouter = createTRPCRouter({
  updateProfile: privateProcedure.input(updateProfileDto).mutation( async ({ctx, input}) => {
    const updatedUser = await updateUser(input, ctx.currentUser.id)
    return updatedUser
  })
});
