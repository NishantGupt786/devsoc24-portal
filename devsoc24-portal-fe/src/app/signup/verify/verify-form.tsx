/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { secondsToHms } from "@/lib/utils";

export default function Form() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(120);
  const input1 = React.useRef<HTMLInputElement>(null);
  const input2 = React.useRef<HTMLInputElement>(null);
  const input3 = React.useRef<HTMLInputElement>(null);
  const input4 = React.useRef<HTMLInputElement>(null);
  const input5 = React.useRef<HTMLInputElement>(null);
  const input6 = React.useRef<HTMLInputElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const formik = useFormik({
    initialValues: {
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
    },
    validationSchema: Yup.object({
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
    }),
    validateOnChange: true,
    onSubmit: (values) => {
      console.log(values);

      //   setSubmitting(true);
      //   const formData = new FormData();
      //   formData.append("email", values.email);
      //   formData.append("password", values.password);
      //   const response = await fetch("/forms", {
      //     method: "POST",
      //     body: formData,
      //   });
      //   setSubmitting(false);
      //   if (response.ok) {
      //     setSubmitted({ open: true, status: true });
      //     formik.resetForm();
      //   } else {
      //     setSubmitted({ open: true, status: false });
      //   }
    },
  });
  const { values, handleChange, handleBlur, handleSubmit } = formik;

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    }
  }, [timer]);

  return (
    <>
      <form
        className="mx-auto mt-4 flex w-full flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Input
              key={i}
              ref={
                i === 0
                  ? input1
                  : i === 1
                    ? input2
                    : i === 2
                      ? input3
                      : i === 3
                        ? input4
                        : i === 4
                          ? input5
                          : input6
              }
              type="text"
              id={i.toString()}
              name={i.toString()}
              minLength={1}
              maxLength={1}
              autoComplete="off"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  const x = (e.target as HTMLInputElement).id;
                  void formik.setFieldValue(x, "");
                  if (x !== "0") {
                    const y = (parseInt(x) - 1).toString();
                    y === "0"
                      ? input1.current?.focus()
                      : y === "1"
                        ? input2.current?.focus()
                        : y === "2"
                          ? input3.current?.focus()
                          : y === "3"
                            ? input4.current?.focus()
                            : y === "4"
                              ? input5.current?.focus()
                              : input6.current?.focus();
                  }
                } else {
                  const x = (e.target as HTMLInputElement).id;
                  if (e.key.match(/^[0-9]$/) ?? e.key.match(/^[a-zA-Z]$/)) {
                    if (e.key.match(/^[a-zA-Z]$/)) {
                      e.key = e.key.toUpperCase();
                    }
                    void formik.setFieldValue(x, e.key);
                    if (x !== "5") {
                      const y = (parseInt(x) + 1).toString();
                      y === "1"
                        ? input2.current?.focus()
                        : y === "2"
                          ? input3.current?.focus()
                          : y === "3"
                            ? input4.current?.focus()
                            : y === "4"
                              ? input5.current?.focus()
                              : input6.current?.focus();
                    }
                    e.preventDefault();
                  } else if (e.key !== "Tab") {
                    e.preventDefault();
                  }
                }
              }}
              value={values[i.toString() as unknown as keyof typeof values]}
              className="h-16 w-12 text-center text-2xl"
            />
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Haven&apos;t received OTP?{" "}
          <Link
            href="/login"
            className={`font-medium ${timer <= 0 ? "text-primary" : ""}`}
          >
            {timer <= 0 ? "Resend" : `Resend in ${secondsToHms(timer)}`}
          </Link>
        </p>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mx-auto mt-4 w-fit px-14"
        >
          {isSubmitting ? "Signing up..." : "Signup"}
        </Button>
      </form>
    </>
  );
}
