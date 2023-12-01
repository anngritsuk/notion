import { z } from "zod";



export const User = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
  password: z.string().regex(/[A-Z]/).regex(/[a-z]/).regex(/[1-9]/).min(8),
})

export const regUser = User.extend({
  repeatedPassword: z.string(),
  createdAt: z.number(),
})
  .superRefine(({ password, repeatedPassword }, ctx) => {
    if (password !== repeatedPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Пароли не совпадают",
        path: ["repeatedPassword"],
      });
    }
  })