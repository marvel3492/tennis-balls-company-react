import { screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import SaleOrderAddRecordPage from "../../frontend/src/views/saleorder/SaleOrderAddRecordPage";
import React from "react";
import { renderWithRouter } from "../utils";

test("SaleOrderAddRecordPage", () => {
    renderWithRouter(<SaleOrderAddRecordPage />);
    expect(screen.getByText("New Record")).toBeInTheDocument();
    expect(screen.getByText("Customer ID:")).toBeInTheDocument();
    expect(screen.getByText("Sale Date:")).toBeInTheDocument();
    expect(screen.getByText("Customer Notes:")).toBeInTheDocument();
    expect(screen.getByText("Payment Status:")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
});