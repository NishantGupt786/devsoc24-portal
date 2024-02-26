"use client";

import * as z from "zod";

export const signupSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email({
        message: "Email must be a valid email address",
      }),
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

export const verifySchema = z.object({
  otp: z
    .string({
      required_error: "OTP is required",
      invalid_type_error: "OTP must be a string",
    })
    .min(6, "OTP must be 6 characters long")
    .max(6, "OTP must be 6 characters long"),
});

export const details1Schema = z.object({
  firstName: z
    .string({
      required_error: "First Name is required",
      invalid_type_error: "First Name must be a string",
    })
    .min(3, "First Name must be atleast 3 characters long")
    .max(50, "First Name cannot be longer than 50 characters"),
  lastName: z
    .string({
      required_error: "First Name is required",
      invalid_type_error: "First Name must be a string",
    })
    .max(50, "First Name cannot be longer than 50 characters"),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Email must be a valid email address",
    }),
  phoneNumber: z
    .string({
      required_error: "Required",
      invalid_type_error: "Phone number must be a string",
    })
    .min(10, "Enter a valid phone number")
    .max(10, "Enter a valid phone number"),
  gender: z
    .literal("Male")
    .or(z.literal("Female"))
    .or(z.literal("Others"))
    .or(z.literal("Prefer Not to Say")),
});
