import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, Matcher, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { tabsList } from "../src/constants";
import { Tab } from "../src/constants";
import Tabs from "../src/components/tabs";

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: JSX.Element) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("Tabs Component", () => {
  it("should render the component correctly with initial state", () => {
    renderWithQueryClient(<Tabs />);

    tabsList.forEach((tab: Tab) => {
      expect(screen.getByText(tab.name)).toBeInTheDocument();
    });

    const firstTab = screen.getByText(tabsList[0].name);
    expect(firstTab).toHaveClass("bg-blue-950");
  });

  it("should change the active tab when a different tab is clicked", () => {
    renderWithQueryClient(<Tabs />);

    tabsList.forEach((tab: Tab) => {
      const currentTab = screen.getByText(tab.name);
      fireEvent.click(currentTab);

      expect(currentTab).toHaveClass("bg-blue-950");

      tabsList
        .filter((t: { index: number }) => t.index !== tab.index)
        .forEach((inactiveTab: { name: Matcher }) => {
          const tabElement = screen.getByText(inactiveTab.name);
          expect(tabElement).toHaveClass("bg-gray-900");
        });
    });
  });

  it("should render the correct TabBody content based on active tab", () => {
    renderWithQueryClient(<Tabs />);

    tabsList.forEach((tab: { name: Matcher; index: number }) => {
      const currentTab = screen.getByText(tab.name);
      fireEvent.click(currentTab);

      const tabContent = screen.getByTestId(`Tab ${tab.index}`);
      expect(tabContent).toBeInTheDocument();
    });
  });
});
