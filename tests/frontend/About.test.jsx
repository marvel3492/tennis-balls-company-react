import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import React from "react";
import About from "../../frontend/src/views/About";

test("About", () => {
    render(<About />);
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("The company sends tennis balls to tennis coaches to train players to improve their tennis game. The company has tennis balls representing all skill levels such as red, orange, green, and yellow. Customers can select how many tennis balls they want.")).toBeInTheDocument();
});