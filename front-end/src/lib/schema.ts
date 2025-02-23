import { z } from "zod";

export const signinSchema = z.object({
  number: z
    .string()
    .min(10)
    .max(10)
    .regex(/^[6-9]\d{9}$/, {
      message: "Invalid mobile number.",
    }),
  password: z.string().min(6, { message: "Too short password." }),
});

export const signupSchema = z.object({
  number: z
    .string()
    .min(10)
    .max(10)
    .regex(/^[6-9]\d{9}$/, {
      message: "Invalid mobile number.",
    }),
  password: z.string().min(6, { message: "Too short password." }),
  name: z.string().min(3, { message: "Too short name." }),
});
