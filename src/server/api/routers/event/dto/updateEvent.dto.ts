import z from 'zod'

export const UpdateEventDto = z.object({
    id: z.string().cuid(),
    title: z.string(),
    timeStart: z.string(),
    timeEnd: z.string(),
    allDay: z.boolean(),
})

export type UpdatEventSchema = z.infer<typeof UpdateEventDto>
