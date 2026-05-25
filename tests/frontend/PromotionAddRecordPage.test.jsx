import { screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import PromotionAddRecordPage from "../../frontend/src/views/promotion/PromotionAddRecordPage";
import React from "react";
import { includesText, renderWithRouter } from "../utils";

test("PromotionAddRecordPage", () => {
    renderWithRouter(<PromotionAddRecordPage />);
    expect(screen.getByText("New Record")).toBeInTheDocument();
    expect(screen.getByText("Image ID (optional):")).toBeInTheDocument();
    expect(screen.getByText("Promotion Title:")).toBeInTheDocument();
    expect(screen.getByText("Description:")).toBeInTheDocument();
    expect(screen.getByText("Start Date:")).toBeInTheDocument();
    expect(screen.getByText("End Date:")).toBeInTheDocument();
    expect(includesText(screen, "Discount Rate")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
});