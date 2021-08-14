import * as GQL from "@apollo/client";
import { Modal } from "@chakra-ui/react";
import { AddItemModal } from "campaign/components/ItemModal/AddItemModal";
import React from "react";
import { fireEvent, render, waitFor } from "shared";

describe("AddItemModal", () => {
  const setUpComponent = ({
    campaignId = "campaign-id",
  }: {
    campaignId?: string;
  }) => {
    const rendered = render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <AddItemModal campaignId={campaignId} />
      </Modal>
    );
    return rendered;
  };

  it("Renders a modal with close and save buttons", () => {
    const { getByText } = setUpComponent({});

    expect(getByText("close")).toBeInTheDocument();
    expect(getByText("save item")).toBeInTheDocument();
  });

  it("save is disabled when no name is entered", () => {
    const { getByText } = setUpComponent({});

    expect(getByText("save item")).toBeDisabled();
  });

  it("entering a name enables the save button", () => {
    // Setup
    const { getByText, getByPlaceholderText } = setUpComponent({});

    // Run
    const input = getByPlaceholderText("item name");
    fireEvent.change(input, { target: { value: "Test Item Name" } });

    // Assert
    expect(getByText("save item")).not.toBeDisabled();
  });

  it("pressing save sends a gql request", async () => {
    // Setup
    const mutateMock = jest.fn(() => Promise.resolve({}));
    jest
      .spyOn(GQL, "useMutation")
      .mockReturnValue([mutateMock, { loading: false } as any]);
    const { getByText, getByPlaceholderText } = setUpComponent({});

    // Run
    const input = getByPlaceholderText("item name");
    fireEvent.change(input, { target: { value: "Test Item Name" } });

    const saveButton = getByText("save item");
    fireEvent.click(saveButton);

    // Assert
    await waitFor(() =>
      expect(mutateMock).toHaveBeenCalledWith({
        variables: {
          id: "campaign-id",
          input: {
            description: undefined,
            name: "Test Item Name",
            quantity: 1,
            tags: [],
          },
        },
      })
    );
  });
});
