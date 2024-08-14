import { z } from "zod";

export const QuestionsSchema = z.object({
  title: z.string().min(5),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100),
});

export const EditProfileSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters long" }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long" }),
  portfolioLink: z
    .string()
    .url({ message: "Portfolio link must be a valid URL" })
    .or(z.literal(""))
    .optional(),
  location: z.string().optional(),
  bio: z
    .string()
    .max(160, { message: "Bio must be 160 characters or less" })
    .optional(),
});
