import * as z from "zod";

export const ideaSchema = z.object({
  title: z
    .string({
      required_error: "Project name is required",
      invalid_type_error: "Project must be a string",
    })
    .max(30, "Title cannot be longer than 50 characters")
    .refine((value) => value.trim().length > 1, {
      message: "Invalid title",
    })
    .refine((value) => value.trim().length < 100, {
      message: "Invalid title",
    }),

  track: z
    .literal("Interactive Engagement")
    .or(z.literal("Eco-Innovations"))
    .or(z.literal("Future of Work"))
    .or(z.literal("Community Building"))
    .or(z.literal("Ethical Technology"))
    .or(z.literal("Open Innovation")),

  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description be a string",
    })
    .min(50, "Description must be at least 50 characters")
    .max(2500, "Description cannot be longer than 2500 characters")
    .refine((value) => value.trim().length > 0, {
      message: "Description must not be empty",
    }),
  figma_link: z
    .string({
      invalid_type_error: "Figma Link be a string",
    })
    .min(10, "Figma link must be a url")
    .max(200, "Figma link cannot be longer than 100 characters")
    .url("Figma link must be a url")
    .optional()
    .or(z.literal("")),

  github_link: z
    .string({
      invalid_type_error: "Github Link be a string",
    })
    .min(10, "Github link must be a url")
    .max(100, "Github link cannot be longer than 100 characters")
    .url("Github link must be a url")
    .optional()
    .or(z.literal("")),

  others: z
    .string({
      required_error: "Other Links is required",
      invalid_type_error: "Other Links be a string",
    })
    .min(10, "Other links must be a url")
    .max(100, "Other links cannot be longer than 200 characters")
    .refine((value) => value.trim().length > 0, {
      message: "Others must not be empty",
    })
    .refine((value) => value.trim().length < 200, {
      message: "Invalid others",
    })
    .or(z.literal("")),
});
