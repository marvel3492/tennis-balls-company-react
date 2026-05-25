import { screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import OrderDetailAddRecordPage from "../../frontend/src/views/orderdetail/OrderDetailAddRecordPage";
import React from "react";
import { renderWithRouter } from "../utils";

test("OrderDetailAddRecordPage", () => {
    renderWithRouter(<OrderDetailAddRecordPage />);
    expect(screen.getByText("New Record")).toBeInTheDocument();
    expect(screen.getByText("Order ID:")).toBeInTheDocument();
    expect(screen.getByText("Product ID:")).toBeInTheDocument();
    expect(screen.getByText("Sale Price:")).toBeInTheDocument();
    expect(screen.getByText("Quantity:")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
});