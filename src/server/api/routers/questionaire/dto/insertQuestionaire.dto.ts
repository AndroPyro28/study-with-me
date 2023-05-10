import { objective_test_type } from '@prisma/client'
import z from 'zod'
// type objectiveTestType = z.infer<typeof zodTags>
export const addQuestionaireDto  = z.object({
    answer: z.string(),
    choices: z.array(z.string()),
    question: z.string(),
    objective_test_Type: z.enum(['MULTIPLE_CHOICES',
        'ENUMERATION',
        'TRUE_OR_FALSE']),
    quizId: z.string().cuid()
})

export type addQuestionaireSchema = z.infer<typeof addQuestionaireDto>