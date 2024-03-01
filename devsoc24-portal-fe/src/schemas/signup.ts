"use client";

import * as z from "zod";
import * as Yup from "yup";

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

export const validationSchema = Yup.object().shape({
  0: Yup.string()
    .required("Required")
    .matches(/^[0-9]$/, "Must be a number"),
  1: Yup.string()
    .required("Required")
    .matches(/^[0-9]$/, "Must be a number"),
  2: Yup.string()
    .required("Required")
    .matches(/^[0-9]$/, "Must be a number"),
  3: Yup.string()
    .required("Required")
    .matches(/^[0-9]$/, "Must be a number"),
  4: Yup.string()
    .required("Required")
    .matches(/^[0-9]$/, "Must be a number"),
  5: Yup.string()
    .required("Required")
    .matches(/^[0-9]$/, "Must be a number"),
});

export const personalDetailsSchema = z.object({
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
    .regex(/^[0-9]{2}[A-Za-z]{3}[0-9]{4}$/, "Enter a valid registration number"),
  vitEmail: z
    .string({
      required_error: "Required",
      invalid_type_error: "VIT Email must be a string",
    })
    .regex(/^[a-zA-Z0-9._-]+@vitstudent.ac.in$/, "Enter a valid VIT email"),
  block: z.union([
    z.literal("Ladies' Hostel - A Block"),
    z.literal("Ladies' Hostel - B Block"),
    z.literal("Ladies' Hostel - C Block"),
    z.literal("Ladies' Hostel - D Block"),
    z.literal("Ladies' Hostel - E Block"),
    z.literal("Ladies' Hostel - F Block"),
    z.literal("Ladies' Hostel - G Block"),
    z.literal("Ladies' Hostel - H Block"),
    z.literal("Men's Hostel - A Block"),
    z.literal("Men's Hostel - B Block"),
    z.literal("Men's Hostel - B Annex"),
    z.literal("Men's Hostel - C Block"),
    z.literal("Men's Hostel - D Block"),
    z.literal("Men's Hostel - D Annex"),
    z.literal("Men's Hostel - E Block"),
    z.literal("Men's Hostel - F Block"),
    z.literal("Men's Hostel - G Block"),
    z.literal("Men's Hostel - H Block"),
    z.literal("Men's Hostel - J Block"),
    z.literal("Men's Hostel - K Block"),
    z.literal("Men's Hostel - L Block"),
    z.literal("Men's Hostel - M Block"),
    z.literal("Men's Hostel - N Block"),
    z.literal("Men's Hostel - P Block"),
    z.literal("Men's Hostel - Q Block"),
    z.literal("Men's Hostel - R Block"),
  ]),
  roomNumber: z
    .string({
      required_error: "Required",
      invalid_type_error: "Room number must be a string",
    })
    .max(10, "Enter a valid room number"),
});

export const externalDetails = z.object({
  collegeName: z
    .string({
      required_error: "Required",
      invalid_type_error: "College name must be a string",
    })
    .max(50, "Enter a valid college name"),
  collegeCity: z
    .string({
      required_error: "Required",
      invalid_type_error: "College city must be a string",
    })
    .max(50, "Enter a valid college city"),
  collegeState: z.union([
    z.literal("Andaman and Nicobar Islands"),
    z.literal("Andhra Pradesh"),
    z.literal("Arunachal Pradesh"),
    z.literal("Assam"),
    z.literal("Bihar"),
    z.literal("Chandigarh"),
    z.literal("Chhattisgarh"),
    z.literal("Dadra and Nagar Haveli"),
    z.literal("Daman and Diu"),
    z.literal("Delhi"),
    z.literal("Goa"),
    z.literal("Gujarat"),
    z.literal("Haryana"),
    z.literal("Himachal Pradesh"),
    z.literal("Jammu and Kashmir"),
    z.literal("Jharkhand"),
    z.literal("Karnataka"),
    z.literal("Kerala"),
    z.literal("Lakshadweep"),
    z.literal("Madhya Pradesh"),
    z.literal("Maharashtra"),
    z.literal("Manipur"),
    z.literal("Meghalaya"),
    z.literal("Mizoram"),
    z.literal("Nagaland"),
    z.literal("Odisha"),
    z.literal("Puducherry"),
    z.literal("Punjab"),
    z.literal("Rajasthan"),
    z.literal("Sikkim"),
    z.literal("Tamil Nadu"),
    z.literal("Telangana"),
    z.literal("Tripura"),
    z.literal("Uttar Pradesh"),
    z.literal("Uttarakhand"),
    z.literal("West Bengal"),
  ]),
  collegeRollNumber: z
    .string({
      required_error: "Required",
      invalid_type_error: "College roll number must be a string",
    })
    .max(50, "Enter a valid college roll number"),
});
