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
      .min(6, "Password must be atleast 6 characters long"),
    confirmPassword: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verifyOTPSchema = z.object({
  otp: z
    .string({
      required_error: "OTP is required",
      invalid_type_error: "OTP must be a string",
    })
    .length(6, "OTP must be 6 characters long"),
});

export const personalDetailsSchema = z.object({
  firstName: z
    .string({
      required_error: "First Name is required",
      invalid_type_error: "First Name must be a string",
    })
    .min(3, "First Name must be atleast 3 characters long")
    .max(50, "First Name cannot be longer than 50 characters")
    .refine((value) => value.trim().length > 3, {
      message: "First Name invalid",
    }),
  lastName: z
    .string({
      required_error: "Last Name is required",
      invalid_type_error: "Last Name must be a string",
    })
    .max(50, "Last Name cannot be longer than 50 characters")
    .refine((value) => value.trim().length > 3, {
      message: "Last Name invalid",
    }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Email must be a valid email address",
    }),
  phone_number: z
    .string({
      required_error: "Required",
      invalid_type_error: "Phone number must be a string",
    })
    .regex(/^\d{10}$/, "Enter a valid 10-digit phone number")
    .min(10, "Enter a valid phone number")
    .max(10, "Enter a valid phone number"),
  country: z
    .string({
      required_error: "Required",
      invalid_type_error: "Country code must be a string",
    })
    .max(4),
  gender: z
    .literal("Male")
    .or(z.literal("Female"))
    .or(z.literal("Others"))
    .or(z.literal("Prefer Not to Say")),
});

export const vitianDetails = z.object({
  regNumber: z
    .string({
      required_error: "Required",
      invalid_type_error: "Registration number must be a string",
    })
    .regex(
      /^[0-9]{2}[A-Za-z]{3}[0-9]{4}$/,
      "Enter a valid registration number",
    ),
  vitEmail: z
    .string({
      required_error: "Required",
      invalid_type_error: "VIT Email must be a string",
    })
    .regex(/^[a-zA-Z0-9._-]+@vitstudent.ac.in$/, "Enter a valid VIT email"),
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
  roomNumber: z
    .string({
      required_error: "Required",
      invalid_type_error: "Room number must be a string",
    })
    .min(1, "Enter a valid room number")
    .max(4, "Enter a valid room number")
    .refine((value) => value.trim().length > 0, {
      message: "First Name must not be empty",
    }),
});

export const externalDetails = z.object({
  collegeName: z
    .string({
      required_error: "Required",
      invalid_type_error: "College name must be a string",
    })
    .min(1, "Enter a valid college name")
    .max(50, "Enter a valid college name"),
  collegeCity: z
    .string({
      required_error: "Required",
      invalid_type_error: "College city must be a string",
    })
    .min(1, "Enter a valid college city")
    .max(50, "Enter a valid college city"),
  collegeState: z
    .literal("Andaman and Nicobar Islands")
    .or(z.literal("Andhra Pradesh"))
    .or(z.literal("Arunachal Pradesh"))
    .or(z.literal("Assam"))
    .or(z.literal("Bihar"))
    .or(z.literal("Chandigarh"))
    .or(z.literal("Chhattisgarh"))
    .or(z.literal("Dadra and Nagar Haveli"))
    .or(z.literal("Daman and Diu"))
    .or(z.literal("Delhi"))
    .or(z.literal("Goa"))
    .or(z.literal("Gujarat"))
    .or(z.literal("Haryana"))
    .or(z.literal("Himachal Pradesh"))
    .or(z.literal("Jammu and Kashmir"))
    .or(z.literal("Jharkhand"))
    .or(z.literal("Karnataka"))
    .or(z.literal("Kerala"))
    .or(z.literal("Lakshadweep"))
    .or(z.literal("Madhya Pradesh"))
    .or(z.literal("Maharashtra"))
    .or(z.literal("Manipur"))
    .or(z.literal("Meghalaya"))
    .or(z.literal("Mizoram"))
    .or(z.literal("Nagaland"))
    .or(z.literal("Odisha"))
    .or(z.literal("Puducherry"))
    .or(z.literal("Punjab"))
    .or(z.literal("Rajasthan"))
    .or(z.literal("Sikkim"))
    .or(z.literal("Tamil Nadu"))
    .or(z.literal("Telangana"))
    .or(z.literal("Tripura"))
    .or(z.literal("Uttar Pradesh"))
    .or(z.literal("Uttarakhand"))
    .or(z.literal("West Bengal")),
  collegeRollNumber: z
    .string({
      required_error: "Required",
      invalid_type_error: "College roll number must be a string",
    })
    .min(1, "Enter a valid college roll number")
    .max(50, "Enter a valid college roll number"),
});

export const joinTeamSchema = z.object({
  teamCode: z
    .string({
      required_error: "Required",
      invalid_type_error: "Team code must be a string",
    })
    .min(6, "Enter a valid team code")
    .max(6, "Enter a valid team code"),
});

export const createTeamSchema = z.object({
  teamName: z
    .string({
      required_error: "Required",
      invalid_type_error: "Team name must be a string",
    })
    .max(50, "Enter a valid team name")
    .refine((value) => value.trim().length > 0, {
      message: "Team Name must not be empty",
    }),
});
