import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import CounterList from "../lib/CounterList.svelte";

const user = userEvent.setup();

beforeEach(() => {
  render(CounterList);
});

test("should render correctly", () => {
  expect(screen.getByText(/count is/i)).toBeInTheDocument();
  expect(screen.getByText(/add counter/i)).toBeInTheDocument();
});

describe("should handle adding and removing counter", () => {
  test("should be able to add counter", async () => {
    await user.click(screen.getByText(/add counter/i));

    expect(screen.getAllByText(/count is/i).length).toBe(2);
  });

  test("should be able to remove counter", async () => {
    await user.click(screen.getByText(/add counter/i));
    expect(screen.getAllByText(/count is/i).length).toBe(2);

    await user.click(screen.getAllByText(/remove/i)[0]);
    expect(screen.getAllByText(/count is/i).length).toBe(1);
  });
});

describe("should handle sum", () => {
  test("sum should increase & decrease when 1 count changes", async () => {
    await user.click(screen.getAllByText(/increment/i)[0]);
    expect(screen.getByText("The sum is 1")).toBeInTheDocument();

    await user.click(screen.getAllByText(/decrement/i)[0]);
    expect(screen.getByText("The sum is 0")).toBeInTheDocument();

    await user.click(screen.getAllByText(/increment/i)[0]);
    await user.click(screen.getAllByText(/reset/i)[0]);
    expect(screen.getByText("The sum is 0")).toBeInTheDocument();
  });

  test("sum should increase & decrease when multiple counts changes", async () => {
    await user.click(screen.getByText(/add counter/i));

    await user.click(screen.getAllByText(/increment/i)[0]);
    await user.click(screen.getAllByText(/decrement/i)[1]);
    expect(screen.getByText("The sum is 0")).toBeInTheDocument();

    await user.click(screen.getAllByText(/decrement/i)[0]);
    await user.click(screen.getAllByText(/reset/i)[1]);
    expect(screen.getByText("The sum is 0")).toBeInTheDocument();
  });

  test("sum should increase & decrease when adding & removing counters", async () => {
    await user.click(screen.getByText(/add counter/i));
    await user.click(screen.getAllByText(/increment/i)[0]);
    expect(screen.getByText("The sum is 1")).toBeInTheDocument();

    await user.click(screen.getAllByText(/decrement/i)[1]);
    expect(screen.getByText("The sum is 0")).toBeInTheDocument();

    await user.click(screen.getAllByText(/remove/i)[0]);
    expect(screen.getByText("The sum is -1")).toBeInTheDocument();
  });
});
