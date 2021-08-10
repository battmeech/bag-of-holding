import { useMutation } from "@apollo/client";
import user from "@testing-library/user-event";
import { createItem } from "campaign/components/__test__/testData";
import { render, screen } from "shared";
import { ItemQuantityEditor } from "../ItemQuantityEditor";

jest.mock("@apollo/client");

describe("ItemQuantityEditor", () => {
  const commonProps = {
    campaignId: "campaignId",
  };
  beforeAll(() => (useMutation as jest.Mock).mockReturnValue([jest.fn()]));

  it("renders the quantity provided", () => {
    render(
      <ItemQuantityEditor
        {...commonProps}
        item={createItem({ quantity: 20 })}
      />
    );

    expect(screen.getByText("20")).toBeInTheDocument();
  });

  describe("plus button", () => {
    it("adds 1 to quantity when clicking +", () => {
      render(
        <ItemQuantityEditor
          {...commonProps}
          item={createItem({ quantity: 1 })}
        />
      );

      const addButton = screen.getByRole("button", { name: "add-quantity" });
      user.click(addButton);

      expect(screen.getByText("2")).toBeVisible();
    });

    it("adds 10 to quantity when shift clicking +", () => {
      render(
        <ItemQuantityEditor
          {...commonProps}
          item={createItem({ quantity: 1 })}
        />
      );

      const addButton = screen.getByRole("button", { name: "add-quantity" });

      user.click(addButton, { shiftKey: true });

      expect(screen.getByText("11")).toBeVisible();
    });

    it("adds 100 to quantity when alt clicking +", () => {
      render(
        <ItemQuantityEditor
          {...commonProps}
          item={createItem({ quantity: 1 })}
        />
      );

      const addButton = screen.getByRole("button", { name: "add-quantity" });

      user.click(addButton, { altKey: true });

      expect(screen.getByText("101")).toBeVisible();
    });
  });

  describe("deduct button", () => {
    it("deducts 1 from quantity when clicking -", () => {
      render(
        <ItemQuantityEditor
          {...commonProps}
          item={createItem({ quantity: 2 })}
        />
      );

      const deductButton = screen.getByRole("button", {
        name: "deduct-quantity",
      });
      user.click(deductButton);

      expect(screen.getByText("1")).toBeVisible();
    });

    it("deducts 10 from quantity when shift clicking -", () => {
      render(
        <ItemQuantityEditor
          {...commonProps}
          item={createItem({ quantity: 11 })}
        />
      );

      const deductButton = screen.getByRole("button", {
        name: "deduct-quantity",
      });
      user.click(deductButton, { shiftKey: true });

      expect(screen.getByText("1")).toBeVisible();
    });

    it("deducts 100 from quantity when alt clicking -", () => {
      render(
        <ItemQuantityEditor
          {...commonProps}
          item={createItem({ quantity: 101 })}
        />
      );

      const deductButton = screen.getByRole("button", {
        name: "deduct-quantity",
      });
      user.click(deductButton, { altKey: true });

      expect(screen.getByText("1")).toBeVisible();
    });

    it("disables - button when value is 0", () => {
      render(
        <ItemQuantityEditor
          {...commonProps}
          item={createItem({ quantity: 0 })}
        />
      );

      const deductButton = screen.getByRole("button", {
        name: "deduct-quantity",
      });

      expect(deductButton).toBeDisabled();
    });

    it("cannot deduct below 0 when shift clicking -", () => {
      render(
        <ItemQuantityEditor
          {...commonProps}
          item={createItem({ quantity: 5 })}
        />
      );

      const deductButton = screen.getByRole("button", {
        name: "deduct-quantity",
      });
      user.click(deductButton, { shiftKey: true });

      expect(screen.getByText("0")).toBeVisible();
    });

    it("cannot deduct below 0 when alt clicking -", () => {
      render(
        <ItemQuantityEditor
          {...commonProps}
          item={createItem({ quantity: 5 })}
        />
      );

      const deductButton = screen.getByRole("button", {
        name: "deduct-quantity",
      });
      user.click(deductButton, { altKey: true });

      expect(screen.getByText("0")).toBeVisible();
    });
  });
  describe("text input", () => {
    it("should not be visible by default", () => {
      render(
        <ItemQuantityEditor
          {...commonProps}
          item={createItem({ quantity: 5 })}
        />
      );
      expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    });

    it("should be visible when quantity is clicked", () => {
      render(
        <ItemQuantityEditor
          {...commonProps}
          item={createItem({ quantity: 5 })}
        />
      );
      user.click(screen.getByText("5"));
      expect(screen.getByRole("textbox")).toBeVisible();
    });

    it("should allow numeric input", () => {
      render(
        <ItemQuantityEditor
          {...commonProps}
          item={createItem({ quantity: 5 })}
        />
      );
      user.click(screen.getByText("5"));
      user.type(screen.getByRole("textbox"), "999");
      expect(screen.getByText("999")).toBeInTheDocument();
    });

    it("should not allow non-numeric input", () => {
      render(
        <ItemQuantityEditor
          {...commonProps}
          item={createItem({ quantity: 5 })}
        />
      );
      user.click(screen.getByText("5"));
      user.type(screen.getByRole("textbox"), "abc");
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });
});
