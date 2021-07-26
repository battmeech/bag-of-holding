import { createItem } from "campaign/components/__test__/testData";
import { useEditQuantity } from "campaign/hooks";
import { render, fireEvent } from "shared";
import { ItemQuantityEditor } from "../ItemQuantityEditor";

jest.mock("campaign/hooks", () => ({
  ...jest.requireActual("campaign/hooks"),
  useEditQuantity: jest.fn(),
}));

describe("ItemQuantityEditor", () => {
  const setUpComponent = ({ quantity = 1 }: { quantity?: number }) => {
    const saveItem = jest.fn();
    const setQuantity = jest.fn();

    (useEditQuantity as jest.Mock).mockReturnValue({
      quantity,
      saveItem,
      setQuantity,
    });

    const rendered = render(
      <ItemQuantityEditor
        campaignId="campaignId"
        item={createItem({ quantity })}
      />
    );

    return { ...rendered, saveItem, setQuantity };
  };

  it("renders the quantity provided", () => {
    const { getByText } = setUpComponent({ quantity: 20 });

    expect(getByText("20")).toBeInTheDocument();
  });

  describe("plus button", () => {
    it("adds 1 to quantity when clicking +", () => {
      const { getByLabelText, setQuantity } = setUpComponent({ quantity: 1 });

      const addButton = getByLabelText("add-quantity");

      fireEvent.click(addButton);

      expect(setQuantity).toHaveBeenCalledWith(2);
    });

    it("adds 10 to quantity when shift clicking +", () => {
      const { getByLabelText, setQuantity } = setUpComponent({ quantity: 1 });

      const addButton = getByLabelText("add-quantity");

      fireEvent.click(addButton, { shiftKey: true });

      expect(setQuantity).toHaveBeenCalledWith(11);
    });

    it("adds 100 to quantity when alt clicking +", () => {
      const { getByLabelText, setQuantity } = setUpComponent({ quantity: 1 });

      const addButton = getByLabelText("add-quantity");

      fireEvent.click(addButton, { shiftKey: true });

      expect(setQuantity).toHaveBeenCalledWith(11);
    });
  });

  describe("deduct button", () => {
    it("deducts 1 from quantity when clicking -", () => {
      const { getByLabelText, setQuantity } = setUpComponent({ quantity: 2 });

      const deductButton = getByLabelText("deduct-quantity");

      fireEvent.click(deductButton);

      expect(setQuantity).toHaveBeenCalledWith(1);
    });

    it("deducts 10 from quantity when shift clicking -", () => {
      const { getByLabelText, setQuantity } = setUpComponent({ quantity: 20 });

      const deductButton = getByLabelText("deduct-quantity");

      fireEvent.click(deductButton, { shiftKey: true });

      expect(setQuantity).toHaveBeenCalledWith(10);
    });

    it("deducts 100 from quantity when alt clicking -", () => {
      const { getByLabelText, setQuantity } = setUpComponent({ quantity: 200 });

      const deductButton = getByLabelText("deduct-quantity");

      fireEvent.click(deductButton, { altKey: true });

      expect(setQuantity).toHaveBeenCalledWith(100);
    });

    it("disables - button when value is 0", () => {
      const { getByLabelText } = setUpComponent({ quantity: 0 });

      const deductButton = getByLabelText("deduct-quantity");

      expect(deductButton).toBeDisabled();
    });

    it("cannot deduct below 0 when shift clicking -", () => {
      const { getByLabelText, setQuantity } = setUpComponent({ quantity: 5 });

      const deductButton = getByLabelText("deduct-quantity");

      fireEvent.click(deductButton, { shiftKey: true });

      expect(setQuantity).toHaveBeenCalledWith(0);
    });

    it("cannot deduct below 0 when alt clicking -", () => {
      const { getByLabelText, setQuantity } = setUpComponent({ quantity: 5 });

      const deductButton = getByLabelText("deduct-quantity");

      fireEvent.click(deductButton, { altKey: true });

      expect(setQuantity).toHaveBeenCalledWith(0);
    });
  });
});
