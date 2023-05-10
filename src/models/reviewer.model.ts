import { NoteTypeInput } from "~/components/AddNoteModal";
import { reviewer } from "./index";
import { updateSchemaType } from "~/components/Timer";
import { faFontAwesomeAlt } from "@fortawesome/free-brands-svg-icons";

export const createOneReviewer = async (reviewerInput: NoteTypeInput, userId: number) => {
  const {image_url, image_id, title,} = reviewerInput;
  const reviewerData = await reviewer.create({
    data: {
        image_url,
        image_id,
        title,
        userId
    }
  });
  return reviewerData;
};

export const findAllReviewerByUserId = async (userId: number, search: string) => {
  const reviewerList = await reviewer.findMany({
    where: {
      userId,
      title: {
        startsWith: search
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return reviewerList
}


export const findOneReviewerByUserId = async (reviewerId: string ,userId: number) => {
  const reviewerData = await reviewer.findFirst({
    where: {
      id: reviewerId,
      userId
    }
  })

  return reviewerData
}

export const updateOneReviewer = async (reviewerInput: updateSchemaType, userId: number) => {
  const {id, notesContent, timeLeft} = reviewerInput
  const reviewerData = await reviewer.update({
    where: {
      id: id,
    },
    data: {
      notes: notesContent,
      time_limit: timeLeft
    }
  })

  return reviewerData
}
export const deleteOneReviewer = async (id: string, userId: number) => {
  const deletedReviewer = await reviewer.delete({
    where: {
      id
    }
  })
  return deletedReviewer
}

