
import { submitAnswerSchema } from '~/server/api/routers/answer/dto/submitAnswer.dto'
import {answer as answerModel} from './'

export const findAnswerByQuizIdAndQuestionId = async (questionId: string, quizId: string, userId: number) => {
    const answerData = await answerModel.findFirst({
        where: {
            question_id: questionId,
            quiz_id: quizId,
            userId
        }
    })
    return answerData
}

export const submitAnswer = async (answerInput: submitAnswerSchema, userId: number) => {
    const { answer, questionId, quizId } = answerInput
    const answerData = await answerModel.create({
        data: {
            answer,
            question_id: questionId,
            quiz_id: quizId,
            userId
        }
    })
    return answerData
}

export const updateAnswer = async (id: string, answer: string) => {
    const answerData = await answerModel.update({
        where: {
            id
        },
        data: {
            answer
        }
    })
    return answerData;
}