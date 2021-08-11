import { FormProps } from "campaign/components/ItemModal/useItemForm";
import React from "react";
import { fireEvent, render } from "shared";
import { ItemForm } from "../ItemForm";

describe("ItemForm", () => {
  const setUpComponent = ({
    errors = new Map<keyof FormProps["values"], boolean>(),
    values = { name: "fantastic item" },
  }: {
    errors?: Map<keyof FormProps["values"], boolean>;
    values?: FormProps["values"];
  }) => {
    const setValueMock = jest.fn();
    const rendered = render(
      <ItemForm setValues={setValueMock} errors={errors} values={values} />
    );
    return { ...rendered, setValueMock };
  };

  it("renders a field for name, description, and quantity", () => {
    const { getByText, getByLabelText } = setUpComponent({});

    expect(getByText("item name")).toBeInTheDocument();
    expect(getByText("item description")).toBeInTheDocument();
    expect(getByLabelText("quantity")).toBeInTheDocument();
  });

  it("calls setValues with name as key when a name is entered", () => {
    const { getByPlaceholderText, setValueMock } = setUpComponent({});

    const input = getByPlaceholderText("item name");
    fireEvent.change(input, { target: { value: "Test Item Name" } });

    expect(setValueMock).toHaveBeenCalledWith({
      key: "name",
      value: "Test Item Name",
    });
  });

  it("calls setValues with description as key when a description is entered", () => {
    const { getByPlaceholderText, setValueMock } = setUpComponent({});

    const input = getByPlaceholderText("item description");
    fireEvent.change(input, { target: { value: "Test Item Description" } });

    expect(setValueMock).toHaveBeenCalledWith({
      key: "description",
      value: "Test Item Description",
    });
  });

  it("calls setValues with quantity as key when a quantity is entered", () => {
    const { getByLabelText, setValueMock } = setUpComponent({});

    const input = getByLabelText("quantity");
    fireEvent.change(input, { target: { value: "2" } });

    expect(setValueMock).toHaveBeenCalledWith({
      key: "quantity",
      value: 2,
    });
  });

  it("displays an error when errors are present", () => {
    const errors = new Map<keyof FormProps["values"], boolean>([
      ["name", true],
      ["description", true],
    ]);
    const { getByPlaceholderText } = setUpComponent({ errors });

    expect(getByPlaceholderText("item name")).toBeInvalid();
    expect(getByPlaceholderText("item description")).toBeInvalid();
  });
});