import z from 'zod'

export const AddEventDto = z.object({
    id: z.string().uuid(),
    title: z.string(),
    timeStart: z.date(),
    timeEnd: z.date(),
    allDay: z.boolean(),
})

export type AddEventSchema = z.infer<typeof AddEventDto>
