import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import ReportMenu from "../../frontend/src/views/report/ReportMenu";
import React from "react";

test("ReportMenu", () => {
    render(<ReportMenu />);
    expect(screen.getByText("Available Reports")).toBeInTheDocument();
    expect(screen.getByText("Customer Listing")).toBeInTheDocument();
    expect(screen.getByText("Product Listing")).toBeInTheDocument();
    expect(screen.getByText("Sale Listing")).toBeInTheDocument();
});