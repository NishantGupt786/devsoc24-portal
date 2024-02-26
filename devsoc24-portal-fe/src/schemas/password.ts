"use client";

import * as z from "zod";

export const forgotSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Email must be a valid email address",
    }),
});

export const resetSchema = z
  .object({
    otp: z
      .string({
        required_error: "OTP is required",
        invalid_type_error: "OTP must be a string",
      })
      .min(6, "OTP must be 6 characters long")
      .max(6, "OTP must be 6 characters long"),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(6, "Password must be atleat 6 characters long"),
    confirmPassword: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
