"use client";

import * as z from "zod";

export const ideaSchema = z.object({
    title: z
    .string({
      required_error: "Project name is required",
      invalid_type_error: "Project must be a string",
    }),
    track: z
    .string({
      required_error: "Project track is required",
      invalid_type_error: "Project track be a string",
    }),
    description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description be a string",
    }).min(50, "Description must be at least 50 characters"),
    figma_link: z
    .string({
      invalid_type_error: "Figma Link be a string",
    }).url("Figma link must be a url"),
    github_link: z
    .string({
      invalid_type_error: "Github Link be a string",
    }).url("Github link must be a url"),
    others: z
    .string({
      required_error: "Other Links is required",
      invalid_type_error: "Other Links be a string",
    }),
});