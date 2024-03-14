"use client";

import * as z from "zod";
export const profileSchema = z.object({
  first_name: z
    .string({
      required_error: "First Name is required",
      invalid_type_error: "First Name must be a string",
    })
    .min(3, "First Name must be atleast 3 characters long")
    .max(20, "First Name cannot be longer than 20 characters"),
  last_name: z
    .string({
      required_error: "Last Name is required",
      invalid_type_error: "Last Name must be a string",
    })
    .max(20, "Last Name cannot be longer than 20 characters"),
  vit_email: z.string({
    invalid_type_error: "VIT Email must be a string",
  }),
  phone: z
    .string({
      required_error: "Required",
      invalid_type_error: "Phone number must be a string",
    })
    .min(10, "Enter a valid phone number")
    .max(10, "Enter a valid phone number"),
  block: z
    .literal("Ladies' Hostel - A Block")
    .or(z.literal("Ladies' Hostel - B Block"))
    .or(z.literal("Ladies' Hostel - C Block"))
    .or(z.literal("Ladies' Hostel - D Block"))
    .or(z.literal("Ladies' Hostel - E Block"))
    .or(z.literal("Ladies' Hostel - F Block"))
    .or(z.literal("Ladies' Hostel - G Block"))
    .or(z.literal("Ladies' Hostel - H Block"))
    .or(z.literal("Men's Hostel - A Block"))
    .or(z.literal("Men's Hostel - B Block"))
    .or(z.literal("Men's Hostel - B Annex"))
    .or(z.literal("Men's Hostel - C Block"))
    .or(z.literal("Men's Hostel - D Block"))
    .or(z.literal("Men's Hostel - D Annex"))
    .or(z.literal("Men's Hostel - E Block"))
    .or(z.literal("Men's Hostel - F Block"))
    .or(z.literal("Men's Hostel - G Block"))
    .or(z.literal("Men's Hostel - H Block"))
    .or(z.literal("Men's Hostel - J Block"))
    .or(z.literal("Men's Hostel - K Block"))
    .or(z.literal("Men's Hostel - L Block"))
    .or(z.literal("Men's Hostel - M Block"))
    .or(z.literal("Men's Hostel - N Block"))
    .or(z.literal("Men's Hostel - P Block"))
    .or(z.literal("Men's Hostel - Q Block"))
    .or(z.literal("Men's Hostel - R Block")),
  room: z
    .string({
      required_error: "Required",
      invalid_type_error: "Room number must be a string",
    })
    .min(1, "Enter a valid room number")
    .max(4, "Enter a valid room number"),
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
