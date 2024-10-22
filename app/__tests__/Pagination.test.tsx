import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "@/components/Pagination";
import "@testing-library/jest-dom";
import { useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

const mockPush = jest.fn();

describe("Pagination Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useSearchParams as jest.Mock).mockReturnValue({
      getAll: (key: string) => (key === "type" ? ["fire", "water"] : []),
    });

    mockPush.mockClear();
  });

  it("renders pagination buttons", () => {
    render(<Pagination currentPage={1} total={100} />);

    expect(screen.getByText("Prev")).toBeDisabled();
    expect(screen.getByText("Next")).toBeEnabled();
  });

  it('calls router.push with the correct page when clicking "Next"', () => {
    render(<Pagination currentPage={1} total={100} />);

    fireEvent.click(screen.getByText("Next"));
    expect(mockPush).toHaveBeenCalledWith("/?page=2&type=fire&type=water");
  });

  it('calls router.push with the correct page when clicking "Previous"', () => {
    render(<Pagination currentPage={2} total={100} />);

    fireEvent.click(screen.getByText("Prev"));
    expect(mockPush).toHaveBeenCalledWith("/?page=1&type=fire&type=water");
  });
});
