import { ContactFormInputs } from "~/components/Signup";
import { user } from "./index";
import { Argonhash } from "~/helper/Argon.helper";
import { UpdateProfileSchema } from "~/pages/profile";

export const findUserByEmail = async (email: string) => {
  const userData = await user.findUnique({
    where: {
      email,
    },
    include: {
      profile: true,
      event: true,
      question: true,
      quiz: true,
      reviewer: true
    }
  });
  return userData;
};

export const findUserById = async (id: number) => {
    const userData = await user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
        event: true,
        question: true,
        quiz: true,
        reviewer: true
      }
    });
    return userData;
  };

export const createUserOne = async (data: ContactFormInputs) => {
  const { email, password, username, firstname, lastname } = data;
  const hashedPassword = await Argonhash(password);

  const userData = await user.create({
    data: {
      email,
      password: hashedPassword,
      username,
      profile: {
        create: { firstname, lastname },
      },
    },
  });

  return userData;
};

export const updateUser = async (data: UpdateProfileSchema, userId: number) => {
  const { email, firstname, lastname, username} = data;

  const userData = await user.update({
    where: {
      id: userId
    },
    data: {
      email,
      username,
      profile: {
        update: {
          firstname,
          lastname
        }
      },
    }
  })
  return userData

}
