import { NoteTypeInput } from "~/components/AddNoteModal";
import { reviewer } from "./index";

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

export const findAllReviewerByUserId = async (userId: number) => {
  const reviewerList = await reviewer.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return reviewerList
}

