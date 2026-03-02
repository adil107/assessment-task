/* eslint-disable @typescript-eslint/no-require-imports */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "../Header";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

const mockedUsePathname = require("next/navigation").usePathname as jest.Mock;
const mockedUseAuth = require("../../context/AuthContext").useAuth as jest.Mock;

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not render on auth routes", () => {
    mockedUsePathname.mockReturnValue("/auth/login");
    mockedUseAuth.mockReturnValue({
      user: null,
      logout: jest.fn(),
    });

    const { container } = render(<Header />);
    expect(container.firstChild).toBeNull();
  });

  it("renders greeting and triggers logout", () => {
    const logout = jest.fn();
    mockedUsePathname.mockReturnValue("/dashboard");
    mockedUseAuth.mockReturnValue({
      user: { fname: "John", lname: "Doe", email: "john@example.com", id: "1" },
      logout,
    });

    render(<Header />);

    expect(screen.getByText("Assessment")).toBeInTheDocument();
    expect(screen.getByText("Hi, John Doe")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Logout"));
    expect(logout).toHaveBeenCalledTimes(1);
  });
});

