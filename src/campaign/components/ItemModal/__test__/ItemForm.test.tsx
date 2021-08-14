import userEvent from "@testing-library/user-event";
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

  it("renders a field for name, description, quantity, and tags", () => {
    const { getByText, getByLabelText } = setUpComponent({});

    expect(getByText("item name")).toBeInTheDocument();
    expect(getByText("item description")).toBeInTheDocument();
    expect(getByLabelText("quantity")).toBeInTheDocument();
    expect(getByLabelText("tags")).toBeInTheDocument();
  });

  it("calls setValues with name as key when a name is entered", () => {
    // Setup
    const { getByPlaceholderText, setValueMock } = setUpComponent({});

    // Run
    const input = getByPlaceholderText("item name");
    fireEvent.change(input, { target: { value: "Test Item Name" } });

    // Assert
    expect(setValueMock).toHaveBeenCalledWith({
      key: "name",
      value: "Test Item Name",
    });
  });

  it("calls setValues with description as key when a description is entered", () => {
    // Setup
    const { getByPlaceholderText, setValueMock } = setUpComponent({});

    // Run
    const input = getByPlaceholderText("item description");
    fireEvent.change(input, { target: { value: "Test Item Description" } });

    // Assert
    expect(setValueMock).toHaveBeenCalledWith({
      key: "description",
      value: "Test Item Description",
    });
  });

  it("calls setValues with quantity as key when a quantity is entered", () => {
    // Setup
    const { getByLabelText, setValueMock } = setUpComponent({});

    // Run
    const input = getByLabelText("quantity");
    fireEvent.change(input, { target: { value: "2" } });

    // Assert
    expect(setValueMock).toHaveBeenCalledWith({
      key: "quantity",
      value: 2,
    });
  });

  it("calls setValues with tags as key when a tag is added", () => {
    // Setup
    const { getByPlaceholderText, setValueMock } = setUpComponent({});

    // Run
    const input = getByPlaceholderText(/enter tags/i);
    userEvent.type(input, "test-tag{space}");

    // Assert
    expect(setValueMock).toHaveBeenCalledWith({
      key: "tags",
      value: ["test-tag"],
    });
  });

  it("displays an error when errors are present", () => {
    // Setup/Run
    const errors = new Map<keyof FormProps["values"], boolean>([
      ["name", true],
      ["description", true],
    ]);
    const { getByPlaceholderText } = setUpComponent({ errors });

    // Assert
    expect(getByPlaceholderText("item name")).toBeInvalid();
    expect(getByPlaceholderText("item description")).toBeInvalid();
  });
});
