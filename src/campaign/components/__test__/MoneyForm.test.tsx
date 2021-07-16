import { FormProps } from "campaign/hooks/useMoneyForm";
import React from "react";
import { render, fireEvent } from "shared";
import { MoneyForm } from "../MoneyForm";

describe("MoneyForm", () => {
  const setUpComponent = ({
    errors = new Map<keyof FormProps["values"], boolean>(),
    values = { copper: 0, electrum: 0, gold: 0, platinum: 0, silver: 0 },
  }: {
    errors?: Map<keyof FormProps["values"], boolean>;
    values?: FormProps["values"];
  }) => {
    const setValueMock = jest.fn();
    const rendered = render(
      <MoneyForm setValues={setValueMock} errors={errors} values={values} />
    );
    return { ...rendered, setValueMock };
  };
  it("renders an input for each currency type", () => {
    const { getByPlaceholderText } = setUpComponent({});

    expect(getByPlaceholderText("copper")).toBeInTheDocument();
    expect(getByPlaceholderText("silver")).toBeInTheDocument();
    expect(getByPlaceholderText("electrum")).toBeInTheDocument();
    expect(getByPlaceholderText("gold")).toBeInTheDocument();
    expect(getByPlaceholderText("platinum")).toBeInTheDocument();
  });

  const testCases = [
    ["add-copper", "copper", 1],
    ["add-silver", "silver", 1],
    ["add-electrum", "electrum", 1],
    ["add-gold", "gold", 1],
    ["add-platinum", "platinum", 1],
  ];

  it.each(testCases)(
    "clicking the %s button calls the set value function with %s and %s",
    (label, key, value) => {
      const { getByLabelText, setValueMock } = setUpComponent({});

      const addButton = getByLabelText(label);

      fireEvent.click(addButton);

      expect(setValueMock).toHaveBeenCalledWith({ key, value });
    }
  );
});
