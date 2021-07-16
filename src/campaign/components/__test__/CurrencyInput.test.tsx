import { CurrencyInput } from "campaign/components/CurrencyInput";
import { fireEvent, render } from "shared";

describe("CurrentInput", () => {
  const setUpComponent = ({
    value = 2,
    error = false,
  }: {
    value?: number;
    error?: boolean;
  }) => {
    const onChangeMock = jest.fn();
    const rendered = render(
      <CurrencyInput
        denomination="copper"
        value={value}
        error={error}
        onChange={onChangeMock}
      />
    );
    return { ...rendered, onChangeMock };
  };

  it("displays the correct value", () => {
    const { getByPlaceholderText } = setUpComponent({});

    const input = getByPlaceholderText("copper") as HTMLInputElement;

    expect(input.value).toStrictEqual("2");
  });

  describe("plus button", () => {
    it("clicking the + button adds a currency", () => {
      const { getByLabelText, onChangeMock } = setUpComponent({});

      const addButton = getByLabelText("add-copper");

      fireEvent.click(addButton);

      expect(onChangeMock).toHaveBeenCalledWith(3);
    });

    it("shift clicking the + button adds 10 currency", () => {
      const { getByLabelText, onChangeMock } = setUpComponent({});

      const addButton = getByLabelText("add-copper");

      fireEvent.click(addButton, { shiftKey: true });

      expect(onChangeMock).toHaveBeenCalledWith(12);
    });

    it("alt clicking the + button adds 100 currency", () => {
      const { getByLabelText, onChangeMock } = setUpComponent({});

      const addButton = getByLabelText("add-copper");

      fireEvent.click(addButton, { altKey: true });

      expect(onChangeMock).toHaveBeenCalledWith(102);
    });
  });

  describe("deduct button", () => {
    it("clicking the - button subtracts a currency", () => {
      const { getByLabelText, onChangeMock } = setUpComponent({});

      const deductButton = getByLabelText("deduct-copper");

      fireEvent.click(deductButton);

      expect(onChangeMock).toHaveBeenCalledWith(1);
    });

    it("shift clicking the - button subtracts 10 currency", () => {
      const { getByLabelText, onChangeMock } = setUpComponent({ value: 100 });

      const deductButton = getByLabelText("deduct-copper");

      fireEvent.click(deductButton, { shiftKey: true });

      expect(onChangeMock).toHaveBeenCalledWith(90);
    });

    it("alt clicking the - button subtracts 100 currency", () => {
      const { getByLabelText, onChangeMock } = setUpComponent({ value: 1000 });

      const deductButton = getByLabelText("deduct-copper");

      fireEvent.click(deductButton, { altKey: true });

      expect(onChangeMock).toHaveBeenCalledWith(900);
    });

    it("the value will not be below 0 when alt clicking when value is 50", () => {
      const { getByLabelText, onChangeMock } = setUpComponent({ value: 50 });

      const deductButton = getByLabelText("deduct-copper");

      fireEvent.click(deductButton, { altKey: true });

      expect(onChangeMock).toHaveBeenCalledWith(0);
    });
  });

  it("will take the value a user types in", () => {
    const { getByPlaceholderText, onChangeMock } = setUpComponent({
      value: 50,
    });

    const input = getByPlaceholderText("copper");

    fireEvent.change(input, { target: { value: "2" } });

    expect(onChangeMock).toHaveBeenCalledWith("2");
  });
});
