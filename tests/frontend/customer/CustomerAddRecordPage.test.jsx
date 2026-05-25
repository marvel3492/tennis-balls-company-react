import { screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import CustomerAddRecordPage from "../../../frontend/src/views/customer/CustomerAddRecordPage";
import React from "react";
import { renderWithRouter } from "../../utils";

test("CustomerAddRecordPage", () => {
    renderWithRouter(<CustomerAddRecordPage />);
    expect(screen.getByText("New Record")).toBeInTheDocument();
    expect(screen.getByText("First Name:")).toBeInTheDocument();
    expect(screen.getByText("Last Name:")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText("Phone:")).toBeInTheDocument();
    expect(screen.getByText("Address:")).toBeInTheDocument();
    expect(screen.getByText("City:")).toBeInTheDocument();
    expect(screen.getByText("State:")).toBeInTheDocument();
    expect(screen.getByText("Zip:")).toBeInTheDocument();
    expect(screen.getByText("Username:")).toBeInTheDocument();
    expect(screen.getByText("Password:")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
});