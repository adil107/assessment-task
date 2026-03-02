"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { TextInput } from "@/src/components/TextInput";
import { PasswordInput } from "@/src/components/PasswordInput";
import { PrimaryButton } from "@/src/components/PrimaryButton";

import { signUpSchema } from "../helper";
import { useAuth } from "@/src/context/AuthContext";

type SignUpFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(signUpSchema),
  });

  const { signup, loading } = useAuth();

  const onSubmit = (data: SignUpFormValues) => {
    const tempData = {
      fname: data.firstName,
      lname: data.lastName,
      email: data.email,
      password: data.password,
    };
    signup(tempData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#171717]">Sign Up</h1>
          <p className="mt-2 text-sm text-[#171717]">
            Create an account to get started.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextInput
              label="First name"
              requiredLabel
              placeholder="John"
              {...register("firstName")}
              error={errors.firstName?.message}
            />

            <TextInput
              label="Last name"
              requiredLabel
              placeholder="Doe"
              {...register("lastName")}
              error={errors.lastName?.message}
            />
          </div>

          <TextInput
            label="Email"
            requiredLabel
            type="text"
            placeholder="you@example.com"
            {...register("email")}
            error={errors.email?.message}
          />

          <PasswordInput
            label="Password"
            requiredLabel
            placeholder="Create a password"
            {...register("password")}
            error={errors.password?.message}
          />

          <PasswordInput
            label="Confirm password"
            requiredLabel
            placeholder="Re-enter your password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <PrimaryButton
            type="submit"
            className="cursor-pointer"
            isLoading={isSubmitting || loading}
          >
            Create account
          </PrimaryButton>

          <p className="text-center text-xs text-[#171717]">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
