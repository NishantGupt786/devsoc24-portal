"use client";

import * as z from "zod";

export const ideaSchema = z.object({
    projectName: z
    .string({
      required_error: "Project name is required",
      invalid_type_error: "Project must be a string",
    }),
    projectTrack: z
    .string({
      required_error: "Project track is required",
      invalid_type_error: "Project track be a string",
    }),
    description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description be a string",
    }),
    figmaLink: z
    .string({
      required_error: "Figma Link is required",
      invalid_type_error: "Figma Link be a string",
    }),
    githubLink: z
    .string({
      required_error: "Github Link is required",
      invalid_type_error: "Github Link be a string",
    }),
    otherLinks: z
    .string({
      required_error: "Other Links is required",
      invalid_type_error: "Other Links be a string",
    }),

  
});