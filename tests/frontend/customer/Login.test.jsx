import { screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Login from "../../../frontend/src/views/customer/Login";
import React from "react";
import { renderWithRouter } from "../../utils";

test("Login", async () => {
    renderWithRouter(<Login />);
    expect(await screen.findByText("Username:")).toBeInTheDocument();
    expect(await screen.findByText("Password:")).toBeInTheDocument();
});