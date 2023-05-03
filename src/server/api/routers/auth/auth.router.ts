import { z } from "zod";
import { contactFormSchemaSignup } from "~/components/Signup";
import { contactFormSchemaLogin } from "~/components/Login";
import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";
import { Argoncompare, Argonhash } from "~/server/helper/Argon.helper";
import { TRPCError } from "@trpc/server";
import { assignToken } from "~/server/helper/Jwt.helper";
// import { login, signup } from "./auth.controller";

export const authRouter = createTRPCRouter({
  signup: publicProcedure.input(contactFormSchemaSignup).mutation(async ({ input, ctx }) => {
    const { password, email, firstname, lastname, username  } = input;
    const hashedPassword = await Argonhash(password)
    const user = await ctx.prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
      profile: {
        create: {firstname, lastname}
      }
    }
  })
  return user
}),

  login: publicProcedure.input(contactFormSchemaLogin).mutation( async ({ input, ctx } ) => {
    const { email, password } = input;
    const user = await ctx.prisma.user.findUnique({
      where: {
        email,
      },
    });

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
    return ctx.currentUser
  })
});
