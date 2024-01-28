import z from 'zod'
export const registerValidation = z.object({
  email: z.string().email().max(100).min(4),
  password: z.string().min(8),
  name: z.string().min(2).max(100),
})
