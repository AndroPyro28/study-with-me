import z from 'zod'

export const AddEventDto = z.object({
    title: z.string(),
    timeStart: z.string(),
    timeEnd: z.string(),
    allDay: z.boolean(),
})

export type AddEventSchema = z.infer<typeof AddEventDto>
