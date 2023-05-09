
import { AddQuizSchema } from '../components/AddQuizModal';
import {quiz} from './'
export const createOneQiuz = async (quizDto: AddQuizSchema, userId: number) => {
    const quizData = await quiz.create({
        data: {
            title: quizDto.title,
            userId
        }
    })

    return quizData
}

export const findAllQuizByUserId = async ( userId: number) => {
    const quizData = await quiz.findMany({
        where: {
            userId
        },
        include: {
            question: true,
            answer: true
        }
    })

    return quizData
}

export const postQUiz = async ( id: string, userId: number) => {
    const quizData = await quiz.update({
        where: {
            id
        },
        data: {
            posted: true
        }
        
    })

    return quizData
}