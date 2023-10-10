import {z} from "zod"

export const createChaptersSchema = z.object({
    title: z.string().min(2).max(100),
    units: z.array(z.string().min(2).max(150))
})