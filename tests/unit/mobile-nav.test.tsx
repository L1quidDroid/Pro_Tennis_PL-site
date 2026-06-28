import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { MobileNav } from "@/components/layout/mobile-nav";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("MobileNav", () => {
  it("toggles the menu open and closed via the button", () => {
    render(<MobileNav />);

    const button = screen.getByRole("button", { name: /open menu/i });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("navigation", { name: /mobile/i })).toBeNull();

    fireEvent.click(button);

    expect(
      screen.getByRole("navigation", { name: /mobile/i }),
    ).toBeInTheDocument();
    const closeButton = screen.getByRole("button", { name: /close menu/i });
    expect(closeButton).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(closeButton);

    expect(screen.queryByRole("navigation", { name: /mobile/i })).toBeNull();
  });

  it("closes the menu when Escape is pressed", () => {
    render(<MobileNav />);

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(
      screen.getByRole("navigation", { name: /mobile/i }),
    ).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("navigation", { name: /mobile/i })).toBeNull();
  });

  it("closes the menu when a nav link is tapped", () => {
    render(<MobileNav />);

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    fireEvent.click(screen.getByRole("link", { name: /services/i }));

    expect(screen.queryByRole("navigation", { name: /mobile/i })).toBeNull();
  });
});
