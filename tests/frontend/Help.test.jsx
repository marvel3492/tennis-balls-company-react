import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Help from "../../frontend/src/views/Help";
import React from "react";

test("Help", () => {
    render(<Help />);
    expect(screen.getByText("Help")).toBeInTheDocument();
    expect(screen.getByText("Click the header and footer buttons or links to navigate the website.")).toBeInTheDocument();
});