import { z } from "zod";

const emptyToUndefined = (value: unknown) => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
};

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  gender: z.enum(["Male", "Female"], {
    errorMap: () => ({ message: "Please choose a gender." })
  }),
  phone: z.preprocess(emptyToUndefined, z.string().trim().min(10).max(20).optional()),
  email: z.preprocess(
    emptyToUndefined,
    z.string().trim().email("Please enter a valid email address.").max(160).optional()
  ),
  isCompanion: z.boolean().default(false),
  parentUserId: z
    .preprocess(emptyToUndefined, z.string().uuid("Invalid parent user reference.").optional())
    .nullable()
    .optional()
});

export const paymentSchema = z.object({
  userId: z.string().uuid("Invalid registration reference."),
  transactionId: z
    .string()
    .trim()
    .min(6, "Please enter a valid UPI transaction ID.")
    .max(120)
});

export const suggestionSchema = z.object({
  userId: z
    .preprocess(emptyToUndefined, z.string().uuid("Invalid user reference.").optional())
    .nullable()
    .optional(),
  content: z
    .string()
    .trim()
    .min(4, "Please share a few words before continuing.")
    .max(1200, "Please keep your note within 1200 characters."),
  isAnonymous: z.boolean().default(true)
});
