import {z} from 'zod';

export const SignupDto = z.object({
    content: z.string().emoji().min(1),
    authorId: z.string()
})

export type SignupSchema = z.infer<typeof SignupDto>;
