import { Argonhash } from "~/helper/Argon.helper";

export const signup = async ({ input, ctx }: any) => {
    const { password, email, firstname, lastname, username  } = input;
    const hashedPassword = await Argonhash(password)

  return ctx.prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
      profile: {
        create: {firstname, lastname}
      }
    }
  })
}

export const login = async ({ input, ctx }: any ) => {
    const { email, password } = input;
    const user = await ctx.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
