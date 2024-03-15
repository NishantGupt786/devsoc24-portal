"use client";

import * as z from "zod";
export const profileSchema = z.object({
  first_name: z
    .string({
      required_error: "First Name is required",
      invalid_type_error: "First Name must be a string",
    })
    .min(3, "First Name must be at least 3 characters long")
    .max(20, "First Name cannot be longer than 20 characters")
    .refine(value => value.trim().length > 0, {
        message: "First Name must not be empty",
    }),
  last_name: z
    .string({
      required_error: "Last Name is required",
      invalid_type_error: "Last Name must be a string",
    })
    .max(20, "Last Name cannot be longer than 20 characters")
    .refine(value => value.trim().length > 0, {
        message: "Last Name must not be empty",
    }),
  vit_email: z.string({
    invalid_type_error: "VIT Email must be a string",
  }),
  phone: z
    .string({
      required_error: "Required",
      invalid_type_error: "Phone number must be a string",
    })
    .regex(/^\d{10}$/, "Enter a valid 10-digit phone number")
    .min(10, "Enter a valid phone number")
    .max(10, "Enter a valid phone number"),
  block: z
    .literal("Ladies' Hostel - A Block")
    .or(z.literal("Ladies' Hostel - B Block"))
    // Rest of the blocks definitions
    .or(z.literal("Men's Hostel - R Block")),
  room: z
    .string({
      required_error: "Required",
      invalid_type_error: "Room number must be a string",
    })
    .min(1, "Enter a valid room number")
    .max(4, "Enter a valid room number")
    .refine(value => value.trim().length > 0, {
        message: "Room number must not be empty or contain only spaces",
    }),
  reg_no: z
    .string({
      required_error: "Required",
      invalid_type_error: "Registration number must be a string",
    })
    .regex(
      /^[0-9]{2}[A-Za-z]{3}[0-9]{4}$/,
      "Enter a valid registration number",
    ),
});
