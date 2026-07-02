import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import { MobileNav } from "@/components/layout/mobile-nav";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("MobileNav", () => {
  it("toggles the menu open and closed via the button", async () => {
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

    // aria-expanded flips immediately; the panel unmounts after its exit
    // animation, so wait for it to leave the DOM.
    expect(button).toHaveAttribute("aria-expanded", "false");
    await waitForElementToBeRemoved(() =>
      screen.queryByRole("navigation", { name: /mobile/i }),
    );
  });

  it("closes the menu when Escape is pressed", async () => {
    render(<MobileNav />);

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(
      screen.getByRole("navigation", { name: /mobile/i }),
    ).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    await waitForElementToBeRemoved(() =>
      screen.queryByRole("navigation", { name: /mobile/i }),
    );
  });

  it("closes the menu when a nav link is tapped", async () => {
    render(<MobileNav />);

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    fireEvent.click(screen.getByRole("link", { name: /services/i }));

    await waitForElementToBeRemoved(() =>
      screen.queryByRole("navigation", { name: /mobile/i }),
    );
  });
});
