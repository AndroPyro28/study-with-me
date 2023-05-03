import { z } from "zod";
import { contactFormSchemaSignup } from "~/components/Signup";
import { contactFormSchemaLogin } from "~/components/Login";
import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";
import { Argoncompare, Argonhash } from "~/helper/Argon.helper";
import { TRPCError } from "@trpc/server";
import { assignToken } from "~/helper/Jwt.helper";
import { createUserOne, findUserByEmail } from "~/models/user.model";
// import { login, signup } from "./auth.controller";

export const authRouter = createTRPCRouter({
  signup: publicProcedure.input(contactFormSchemaSignup).mutation(async ({ input, ctx }) => {
    // const { password, email, firstname, lastname, username  } = input;
    const user = createUserOne(input)
    return user
}),

  login: publicProcedure.input(contactFormSchemaLogin).mutation( async ({ input, ctx } ) => {
    const { email, password } = input;
    const user = await findUserByEmail(email)

    if(!user || !user.id) {
      throw new TRPCError({code: 'FORBIDDEN', message: 'Invalid Credentials'})
    }

    const isMatch = await Argoncompare(password, user.password);

    if(!isMatch) {
      throw new TRPCError({code: 'FORBIDDEN', message: 'Invalid Credentials'})
    }
    
    const token = assignToken(user.id);

    return {
      user,
      token
    };
  }),

  getMe: privateProcedure.query(async ({ctx}) => {
    ctx.currentUser = {...ctx.currentUser, password: ''}
    return ctx.currentUser
  })
});
