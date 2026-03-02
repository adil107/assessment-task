import React from "react";
import { render, screen } from "@testing-library/react";
import { TextInput } from "../TextInput";

describe("TextInput", () => {
  it("renders label, required marker and input", () => {
    render(
      <TextInput
        label="First name"
        name="firstName"
        requiredLabel
        placeholder="John"
      />,
    );

    const label = screen.getByText("First name");
    expect(label).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();

    const input = screen.getByPlaceholderText("John") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.id).toBe("firstName");
  });

  it("renders error message when error prop is provided", () => {
    render(
      <TextInput
        label="Email"
        name="email"
        error="Email is required"
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Email is required");
  });
});

