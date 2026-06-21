import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Hero } from "@/components/sections/hero";

describe("Hero", () => {
  it("renders the booking call-to-action", () => {
    render(<Hero />);
    expect(
      screen.getByRole("link", { name: /book a restring now/i }),
    ).toBeInTheDocument();
  });
});
