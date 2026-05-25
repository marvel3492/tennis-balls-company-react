import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Contact from "../../frontend/src/views/Contact";
import React from "react";

test("Contact", () => {
    render(<Contact />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("Email: tennis@lessons.com")).toBeInTheDocument();
    expect(screen.getByText("Phone Number: XXX-XXX-XXXX")).toBeInTheDocument();
});