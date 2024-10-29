import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TabBody from "../src/components/tab-body";

vi.mock("react-hot-toast", () => ({
  default: vi.fn(),
}));

const mockFetch = (response: string, ok: boolean = true) => {
  global.fetch = vi.fn().mockResolvedValue({
    ok,
    text: () => Promise.resolve(response),
  });
};

const renderWithQueryClient = (ui: JSX.Element) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("TabBody Component", () => {
  it("should display a loading skeleton while fetching data", async () => {
    mockFetch("Dummy text");

    renderWithQueryClient(<TabBody activeIndex={1} />);

    expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByTestId("loading-skeleton")).toBeNull()
    );
  });

  it("should render data when fetch is successful", async () => {
    const dummyText = "This is dummy data";
    mockFetch(dummyText);

    renderWithQueryClient(<TabBody activeIndex={1} />);

    await waitFor(() => {
      expect(screen.getByText(`Title 1`)).toBeInTheDocument();
      expect(screen.getByText(dummyText)).toBeInTheDocument();
    });
  });
});
