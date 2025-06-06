"use client";

import { Role } from "@prisma/client";
import { z } from "zod";

// Nigerian phone number validation
const phoneRegex = /^(\+234|234|0)?[789][01]\d{8}$/;

// NIN validation (11 digits)
const ninRegex = /^\d{11}$/;

// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const userEditFormSchema = z
  .object({
    // Basic Information
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must not exceed 50 characters")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "First name can only contain letters, spaces, hyphens, and apostrophes"
      ),

    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must not exceed 50 characters")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "Last name can only contain letters, spaces, hyphens, and apostrophes"
      ),

    email: z
      .string()
      .min(1, "Email is required")
      .regex(emailRegex, "Please enter a valid email address"),

    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(phoneRegex, "Please enter a valid Nigerian phone number"),

    role: z.nativeEnum(Role, {
      required_error: "Please select a role",
    }),

    gender: z.string().optional(),

    marital_status: z.string().optional(),

    // Identification (optional for edit)
    identification: z.string({
      required_error: "Please select an identification type",
    }),

    identificationNumber: z
      .string()
      .optional()
      // @ts-expect-error: TypeScript doesn't recognize the context in refine
      .refine((val, ctx) => {
        if (!val) return true; // Optional for edit
        const identificationType = ctx.parent.identification;
        if (identificationType === "NIN") {
          return ninRegex.test(val);
        }
        return val.length >= 5; // Minimum length for other ID types
      }, "Please enter a valid identification number"),

    // Address
    address: z.object({
      STREET: z.string().min(1, "Street address is required"),
      UNIT: z.string().optional(),
      CITY: z.string().min(1, "City is required"),
      STATE: z.string().min(1, "State is required"),
      POSTAL_CODE: z.string().optional(),
      COUNTRY: z.string().default("Nigeria"),
      LGA: z.string().optional(),
    }),

    lgaId: z.string().optional(),

    // Password (optional for edit)
    password: z
      .string()
      .optional()
      .refine((val) => {
        if (!val) return true; // Optional for edit
        return val.length >= 8;
      }, "Password must be at least 8 characters")
      .refine((val) => {
        if (!val) return true; // Optional for edit
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(val);
      }, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),

    confirmPassword: z.string().optional(),

    // Optional fields
    whatsapp: z
      .string()
      .optional()
      .refine(
        (val) => !val || phoneRegex.test(val),
        "Please enter a valid WhatsApp number"
      ),

    nok_name: z.string().optional(),
    nok_phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || phoneRegex.test(val),
        "Please enter a valid phone number"
      ),
    nok_relationship: z.string().optional(),
    maiden_name: z.string().optional(),
    profileImage: z.string().optional(),
    blacklisted: z.boolean().default(false),
  })
  .refine(
    (data) => {
      // Only validate password confirmation if password is provided
      if (data.password && data.password.length > 0) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type UserEditFormValues = z.infer<typeof userEditFormSchema>;

export const genderOptions = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

export const maritalStatusOptions = [
  { value: "SINGLE", label: "Single" },
  { value: "MARRIED", label: "Married" },
  { value: "DIVORCED", label: "Divorced" },
  { value: "WIDOWED", label: "Widowed" },
];

export const identificationOptions = [
  { value: "BVN", label: "Bank Verification Number (BVN)" },
  { value: "NIN", label: "National Identification Number (NIN)" },
  { value: "DRIVERS_LICENSE", label: "Driver's License" },
  { value: "PASSPORT", label: "International Passport" },
  { value: "VOTERS_CARD", label: "Voter's Card" },
];
