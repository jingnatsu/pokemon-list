import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterByType from "@/components/FilterByType";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import { POKEMON_API_URL } from "../page";
// Mock the Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

describe("FilterByType Component", () => {
  beforeEach(() => {
    // Ensure useRouter mock returns the necessary properties
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    mockPush.mockClear(); // Clear any previous calls to the mock
  });

  const mockTypes = [
    { name: "fire", url: `${POKEMON_API_URL}/type/10/` },
    { name: "water", url: `${POKEMON_API_URL}/type/11/` },
  ];

  it("renders type filter buttons", () => {
    render(<FilterByType types={mockTypes} count={0} selectedTypes={[]} />);

    expect(screen.getByText("fire")).toBeInTheDocument();
    expect(screen.getByText("water")).toBeInTheDocument();
  });

  it("handles type selection and calls router.push with the correct query", () => {
    jest.useFakeTimers(); // Use fake timers for debounce handling

    render(<FilterByType types={mockTypes} count={0} selectedTypes={[]} />);

    fireEvent.click(screen.getByText("fire"));
    // Fast-forward through the debounce timeout
    jest.runAllTimers();
    // Verify the router's push method was called with the correct query string
    expect(mockPush).toHaveBeenCalledWith("/?type=fire&page=1");
  });

  it("removes a type on second click and updates the router correctly", () => {
    jest.useFakeTimers();

    render(
      <FilterByType types={mockTypes} count={0} selectedTypes={["fire"]} />
    );

    fireEvent.click(screen.getByText("fire"));
    jest.runAllTimers();
    expect(mockPush).toHaveBeenCalledWith("/?&page=1");
  });
});
