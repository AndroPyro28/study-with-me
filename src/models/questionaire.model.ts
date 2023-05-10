
import { addQuestionaireSchema } from '~/server/api/routers/questionaire/dto/insertQuestionaire.dto'
import {question} from './'
import { deleteQuestionaireSchema } from '~/server/api/routers/questionaire/dto/deleteQuestionaire.dto'
// import { objective_test_type } from '@prisma/client'

export const createOneQuestionaire = async (questionaireInput: addQuestionaireSchema, userId: number) => {
    const {answer, choices, objective_test_Type: objectiveTestType, question: questionaire, quizId } = questionaireInput
    const createChoices = choices.map((choice) => ({
        choice: choice,
        quiz_id: quizId
    }))
    const questionaireData = await question.create({
        data: {
            // answer
            dedicated_answer: answer,
            question: questionaire,
            userId,
            objective_test_type: objectiveTestType,
            quiz_id: quizId,
            choice: {
                createMany: {
                    data: [...createChoices]
                }
            }
        },
    })

    return questionaireData
}

export const getAllQuestionaireByQuizId = async (quizId: string, userId: number) => {
    const questionaires = await question.findMany({
        where: {
            quiz_id: quizId,
            userId: userId
        },
        include: {
            choice: true
        }
    })
    return questionaires;
}

export const deleteOneQuestionaire = async (input: deleteQuestionaireSchema) => {
    const questionaireData = await question.delete({
        where: {
            id:input.id,
        }
    })

    return questionaireData
}
