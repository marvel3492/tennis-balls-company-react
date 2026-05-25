import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Footer from "../../frontend/src/components/Footer";
import React from "react";
import { includesText } from "../utils";

test("Footer", () => {
    render(<Footer />);
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Help")).toBeInTheDocument();
    expect(includesText(screen, "Tennis Balls Company")).toBeInTheDocument();
});