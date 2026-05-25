import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Privacy from "../../frontend/src/views/Privacy";
import React from "react";

test("Privacy", () => {
    render(<Privacy />);
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Your privacy is important to us. We do not collect any personal data from our users. Any information provided by users is used solely for the purpose of improving our services and will not be shared with third parties.")).toBeInTheDocument();
});