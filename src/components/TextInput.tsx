"use client";
import React, { InputHTMLAttributes, forwardRef } from "react";

type TextInputProps = {
  label: string;
  error?: string;
  requiredLabel?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, id, error, requiredLabel, className = "", ...rest }, ref) => {
    const inputId = id || rest.name;

    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-[#171717]"
        >
          {label}
          {requiredLabel && <span className="ml-0.5 text-red-500">*</span>}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={`w-full rounded-lg border border-blue-100 bg-blue-50/40 px-3 py-2 text-sm text-[#171717] placeholder-slate-400 outline-none ring-0 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 ${className}`}
          {...rest}
        />
        {error && (
          <p className="text-xs text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

