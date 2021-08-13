import React from "react";
import { fireEvent, render } from "shared";
import { Sorting } from "../Sorting";

describe("Sorting", () => {
  const setUpComponent = ({ order }: { order: "asc" | "desc" }) => {
    const toggleSortingOrder = jest.fn();
    const rendered = render(
      <Sorting sortingOrder={order} toggleSortingOrder={toggleSortingOrder} />
    );
    return { ...rendered, toggleSortingOrder };
  };
  it("Renders ascending icon when order is ascending", () => {
    const { getByTestId } = setUpComponent({ order: "asc" });

    expect(getByTestId("ascending-icon")).toBeInTheDocument();
  });

  it("Renders descending icon when order is descending", () => {
    const { getByTestId } = setUpComponent({ order: "desc" });

    expect(getByTestId("descending-icon")).toBeInTheDocument();
  });

  it("Clicking calls the toggle function", () => {
    const { getByTestId, toggleSortingOrder } = setUpComponent({
      order: "asc",
    });

    fireEvent.click(getByTestId("ascending-icon"));

    expect(toggleSortingOrder).toHaveBeenCalled();
  });
});
