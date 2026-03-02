"use client";
import React, { ButtonHTMLAttributes } from "react";

type PrimaryButtonProps = {
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  isLoading,
  className = "",
  disabled,
  ...rest
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={rest.type || "button"}
      disabled={isDisabled}
      className={`w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-blue-50 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...rest}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

