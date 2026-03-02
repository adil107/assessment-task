import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PasswordInput } from "../PasswordInput";

describe("PasswordInput", () => {
  it("renders label, required marker and password input", () => {
    render(
      <PasswordInput
        label="Password"
        name="password"
        requiredLabel
        placeholder="Enter password"
      />,
    );

    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();

    const input = screen.getByPlaceholderText(
      "Enter password",
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe("password");
  });

  it("toggles password visibility when icon button is clicked", () => {
    render(
      <PasswordInput
        label="Password"
        name="password"
        placeholder="Enter password"
      />,
    );

    const input = screen.getByPlaceholderText(
      "Enter password",
    ) as HTMLInputElement;
    const toggleButton = screen.getByRole("button", { name: /show password/i });

    expect(input.type).toBe("password");

    fireEvent.click(toggleButton);
    expect(input.type).toBe("text");
    expect(
      screen.getByRole("button", { name: /hide password/i }),
    ).toBeInTheDocument();
  });

  it("renders error message when error prop is provided", () => {
    render(
      <PasswordInput
        label="Password"
        name="password"
        error="Password is required"
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Password is required");
  });
});

