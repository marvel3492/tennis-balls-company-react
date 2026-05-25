import { screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import ImageAddRecordPage from "../../frontend/src/views/image/ImageAddRecordPage";
import React from "react";
import { includesText, renderWithRouter } from "../utils";

test("ImageAddRecordPage", () => {
    renderWithRouter(<ImageAddRecordPage />);
    expect(screen.getByText("New Record")).toBeInTheDocument();
    expect(screen.getByText("Image:")).toBeInTheDocument();
    expect(includesText(screen, "Description")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
});