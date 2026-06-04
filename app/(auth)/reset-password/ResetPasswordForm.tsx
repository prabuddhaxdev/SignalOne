"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { resetPasswordWithToken, requestPasswordResetEmail } from "@/lib/actions/auth.actions";
import { PASSWORD_VALIDATION } from "@/lib/constants";
import { PasswordRequirements } from "@/components/forms/PasswordRequirements";

type ResetPasswordFormData = {
  newPassword: string;
  confirmPassword: string;
};

const RequestResetEmailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: { email: string }) => {
    try {
      const result = await requestPasswordResetEmail(data);

      if (result.success) {
        toast.success(
          "If an account exists for that email, a reset link has been sent.",
        );
        return;
      }

      toast.error("Password reset unavailable", {
        description: result.error ?? "Unable to start password reset.",
      });
    } catch (error) {
      toast.error("Password reset unavailable", {
        description:
          error instanceof Error
            ? error.message
            : "Unable to start password reset.",
      });
    }
  };

  return (
    <>
      <h1 className="form-title">Forgot your password?</h1>
      <p className="text-sm text-gray-400 mb-6">
        Enter your email address and we&apos;ll send you a password reset link.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
              message: "Please enter a valid email address",
            },
          }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Sending reset link" : "Send reset link"}
        </Button>

        <FooterLink text="Remembered it?" linkText="Sign in" href="/sign-in" />
      </form>
    </>
  );
};

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const error = searchParams.get("error");

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const newPassword = watch("newPassword");

  useEffect(() => {
    if (error === "INVALID_TOKEN") {
      toast.error("Reset link is invalid or expired.");
    }
  }, [error]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error("Reset link is invalid or expired.");
      return;
    }

    try {
      const result = await resetPasswordWithToken({
        token,
        newPassword: data.newPassword,
      });

      if (result.success) {
        toast.success("Password updated. You can sign in now.");
        router.push("/sign-in");
        return;
      }

      toast.error("Password reset failed", {
        description: result.error ?? "Unable to reset your password.",
      });
    } catch (error) {
      toast.error("Password reset failed", {
        description:
          error instanceof Error
            ? error.message
            : "Unable to reset your password.",
      });
    }
  };

  if (!token) {
    return <RequestResetEmailForm />;
  }

  return (
    <>
      <h1 className="form-title">Choose a new password</h1>
      <p className="text-sm text-gray-400 mb-6">
        Enter a new password for your account.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="newPassword"
          label="New Password"
          placeholder="Enter a new password"
          type="password"
          register={register}
          error={errors.newPassword}
          validation={PASSWORD_VALIDATION}
        />
        <PasswordRequirements password={newPassword ?? ""} />

        <InputField
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your new password"
          type="password"
          register={register}
          error={errors.confirmPassword}
          validation={{
            required: "Please confirm your new password",
            validate: (value: string) =>
              value === newPassword || "Passwords do not match",
          }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Resetting password" : "Reset password"}
        </Button>

        <FooterLink
          text="Need a fresh link?"
          linkText="Request another one"
          href="/reset-password"
        />
      </form>
    </>
  );
};

export default ResetPasswordForm;
