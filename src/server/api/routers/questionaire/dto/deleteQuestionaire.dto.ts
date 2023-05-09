import z from 'zod'
// type objectiveTestType = z.infer<typeof zodTags>
export const deleteQuestionaireDto  = z.object({
    quizId: z.string().cuid(),
    id: z.string().cuid()
})

export type deleteQuestionaireSchema = z.infer<typeof deleteQuestionaireDto>