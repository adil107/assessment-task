"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { TextInput } from "@/src/components/TextInput";
import { PasswordInput } from "@/src/components/PasswordInput";
import { PrimaryButton } from "@/src/components/PrimaryButton";
import { loginSchema } from "../helper";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    // Replace this with your actual login logic
    console.log("Form submitted:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#171717]">Login</h1>
          <p className="mt-2 text-sm text-[#171717]">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email"
            requiredLabel
            type="text"
            autoComplete="email"
            placeholder="you@example.com"
            {...register("email")}
            error={errors.email?.message}
          />

          <PasswordInput
            label="Password"
            requiredLabel
            autoComplete="current-password"
            placeholder="Enter your password"
            {...register("password")}
            error={errors.password?.message}
          />

          <PrimaryButton
            type="submit"
            isLoading={isSubmitting}
            className="cursor-pointer"
          >
            Login
          </PrimaryButton>

          <p className="text-center text-xs text-[#171717]">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
