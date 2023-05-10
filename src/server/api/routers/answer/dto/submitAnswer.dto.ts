import z from 'zod';

export const submitAnswerDto = z.object({
    answer: z.string(),
    quizId: z.string().cuid(),
    questionId: z.string().cuid(),
})

export type submitAnswerSchema = z.infer<typeof submitAnswerDto>;