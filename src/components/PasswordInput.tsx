"use client";
import React, {
  InputHTMLAttributes,
  forwardRef,
  useState,
  useId,
} from "react";

type PasswordInputProps = {
  label: string;
  error?: string;
  requiredLabel?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, id, error, requiredLabel, className = "", ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const generatedId = useId();
    const inputId = id || rest.name || generatedId;

    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-[#171717]"
        >
          {label}
          {requiredLabel && <span className="ml-0.5 text-red-500">*</span>}
        </label>
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={showPassword ? "text" : "password"}
            className={`w-full rounded-lg border border-blue-100 bg-blue-50/40 px-3 py-2 pr-10 text-sm text-[#171717] placeholder-slate-400 outline-none ring-0 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 ${className}`}
            {...rest}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500 hover:text-blue-600 transition"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3l18 18M10.584 10.587A3 3 0 0113.41 13.41M9.88 9.88L7.05 7.05M9.88 9.88a3 3 0 014.243 4.243m0 0l2.829 2.829M6.228 6.228A10.451 10.451 0 003 12s2.727 5.5 9 5.5a9.971 9.971 0 004.5-1.06M14.12 14.12L9.88 9.88M17.885 17.885A10.451 10.451 0 0021 12s-.49-.988-1.5-2.25"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
        {error && (
          <p className="text-xs text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

