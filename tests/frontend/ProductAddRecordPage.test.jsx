import { screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import ProductAddRecordPage from "../../frontend/src/views/product/ProductAddRecordPage";
import React from "react";
import { renderWithRouter } from "../utils";

test("ProductAddRecordPage", () => {
    renderWithRouter(<ProductAddRecordPage />);
    expect(screen.getByText("New Record")).toBeInTheDocument();
    expect(screen.getByText("Image ID (optional):")).toBeInTheDocument();
    expect(screen.getByText("Product Name:")).toBeInTheDocument();
    expect(screen.getByText("Description:")).toBeInTheDocument();
    expect(screen.getByText("Price:")).toBeInTheDocument();
    expect(screen.getByText("Homepage:")).toBeInTheDocument();
    expect(screen.getByText("Stock:")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
});