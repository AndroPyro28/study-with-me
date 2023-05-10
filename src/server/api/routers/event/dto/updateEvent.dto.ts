import z from 'zod'

export const UpdateEventDto = z.object({
    id: z.string().uuid(),
    title: z.string(),
    timeStart: z.date(),
    timeEnd: z.date(),
    allDay: z.boolean(),
})

export type UpdatEventSchema = z.infer<typeof UpdateEventDto>
