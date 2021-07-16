import * as GQL from "@apollo/client";
import { Modal } from "@chakra-ui/react";
import { MoneyModal } from "campaign/components/MoneyModal";
import { EditItem_editItem_Campaign_items as Item } from "campaign/gql";
import React from "react";
import { fireEvent, render, waitFor } from "shared";

describe("MoneyModal", () => {
  const setUpComponent = ({
    campaignId = "campaign-id",
  }: {
    campaignId?: string;
    item?: Item;
  }) => {
    const rendered = render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <MoneyModal campaignId={campaignId} />
      </Modal>
    );
    return rendered;
  };

  it("renders a modal with close and save buttons", () => {
    const { getByText } = setUpComponent({});

    expect(getByText("add")).toBeInTheDocument();
    expect(getByText("deduct")).toBeInTheDocument();
  });

  it("buttons are disable on initial load", () => {
    const { getByText } = setUpComponent({});

    expect(getByText("add")).toBeDisabled();
    expect(getByText("deduct")).toBeDisabled();
  });

  it("setting a value enables the buttons", () => {
    const { getByText, getByLabelText } = setUpComponent({});

    const addButton = getByLabelText("add-copper");
    fireEvent.click(addButton);

    expect(getByText("add")).not.toBeDisabled();
    expect(getByText("deduct")).not.toBeDisabled();
  });

  it("pressing add sends a gql request", async () => {
    const mutateMock = jest.fn(() => Promise.resolve({}));
    jest
      .spyOn(GQL, "useMutation")
      .mockReturnValue([mutateMock, { loading: false } as any]);
    const { getByText, getByLabelText } = setUpComponent({});

    const addButton = getByLabelText("add-copper");
    fireEvent.click(addButton);

    const saveButton = getByText("add");
    fireEvent.click(saveButton);

    await waitFor(() =>
      expect(mutateMock).toHaveBeenCalledWith({
        variables: {
          id: "campaign-id",
          input: {
            copper: 1,
            electrum: 0,
            gold: 0,
            modification: "ADD",
            platinum: 0,
            silver: 0,
          },
        },
      })
    );
  });

  it("pressing deduct sends a gql request", async () => {
    const mutateMock = jest.fn(() => Promise.resolve({}));
    jest
      .spyOn(GQL, "useMutation")
      .mockReturnValue([mutateMock, { loading: false } as any]);
    const { getByText, getByLabelText } = setUpComponent({});

    const addButton = getByLabelText("add-copper");
    fireEvent.click(addButton);

    const saveButton = getByText("deduct");
    fireEvent.click(saveButton);

    await waitFor(() =>
      expect(mutateMock).toHaveBeenCalledWith({
        variables: {
          id: "campaign-id",
          input: {
            copper: 1,
            electrum: 0,
            gold: 0,
            modification: "DEDUCT",
            platinum: 0,
            silver: 0,
          },
        },
      })
    );
  });
});
