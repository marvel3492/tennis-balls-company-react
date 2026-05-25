import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

/**
 * @param {import("@testing-library/react").Screen} screen 
 * @param {string} text
 */
export function includesText(screen, text) {
    return screen.getByText((t) => t.includes(text))
}

/**
 * @param {React.ReactElement} element 
 */
export function renderWithRouter(element) {
    render(
        <MemoryRouter future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
        }}>
            {element}
        </MemoryRouter>
    );
}