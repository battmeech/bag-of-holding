import userEvent from "@testing-library/user-event";
import { FormProps } from "campaign/components/ItemModal/useItemForm";
import React from "react";
import { fireEvent, render } from "shared";
import { ItemForm } from "../ItemForm";

describe("ItemForm", () => {
  const setupComponent = ({
    errors = {},
    values = { name: "fantastic item" },
  }: {
    errors?: FormProps["errors"];
    values?: FormProps["values"];
  }) => {
    const setValueMock = jest.fn();

    const rendered = render(
      <ItemForm setValue={setValueMock} errors={errors} values={values} />
    );
    return { ...rendered, setValueMock };
  };

  it("renders a field for name, description, quantity, and tags", () => {
    const { getByText, getByLabelText } = setupComponent({});

    expect(getByText("item name")).toBeInTheDocument();
    expect(getByText("item description")).toBeInTheDocument();
    expect(getByLabelText("quantity")).toBeInTheDocument();
    expect(getByLabelText("tags")).toBeInTheDocument();
  });

  it("calls setValues with name as key when a name is entered", () => {
    const { getByPlaceholderText, setValueMock } = setupComponent({});

    const input = getByPlaceholderText("item name");
    fireEvent.change(input, { target: { value: "Test Item Name" } });

    expect(setValueMock).toHaveBeenCalledWith("name", "Test Item Name");
  });

  it("calls setValues with description as key when a description is entered", () => {
    const { getByPlaceholderText, setValueMock } = setupComponent({});

    const input = getByPlaceholderText("item description");
    fireEvent.change(input, { target: { value: "Test Item Description" } });

    expect(setValueMock).toHaveBeenCalledWith(
      "description",
      "Test Item Description"
    );
  });

  it("calls setValues with quantity as key when a quantity is entered", () => {
    const { getByLabelText, setValueMock } = setupComponent({});

    const input = getByLabelText("quantity");
    fireEvent.change(input, { target: { value: "2" } });

    expect(setValueMock).toHaveBeenCalledWith("quantity", 2);
  });

  it("calls setValues with tags as key when a tag is added", () => {
    const { getByPlaceholderText, setValueMock } = setupComponent({});

    const input = getByPlaceholderText(/enter tags/i);
    userEvent.type(input, "test-tag{space}");

    expect(setValueMock).toHaveBeenCalledWith("tags", ["test-tag"]);
  });

  it("displays an error when errors are present", () => {
    const errors: FormProps["errors"] = {
      name: { type: "max" },
    };

    const { getByPlaceholderText } = setupComponent({ errors });

    expect(getByPlaceholderText("item name")).toBeInvalid();
  });
});
