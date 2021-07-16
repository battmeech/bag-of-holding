import * as GQL from "@apollo/client";
import { Modal } from "@chakra-ui/react";
import React from "react";
import { fireEvent, render, waitFor } from "shared";
import { EditItemModal } from "campaign/components/EditItemModal";
import { EditItem_editItem_Campaign_items as Item } from "campaign/gql";
import { createItem } from "./testData";

describe("EditItemModal", () => {
  const setUpComponent = ({
    campaignId = "campaign-id",
    item = createItem({}),
  }: {
    campaignId?: string;
    item?: Item;
  }) => {
    const rendered = render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <EditItemModal campaignId={campaignId} item={item} />
      </Modal>
    );
    return rendered;
  };

  it("renders a modal with close and save buttons", () => {
    const { getByText } = setUpComponent({});

    expect(getByText("close")).toBeInTheDocument();
    expect(getByText("save item")).toBeInTheDocument();
  });

  it("save is enabled on modal load is entered", () => {
    const { getByText } = setUpComponent({});

    expect(getByText("save item")).not.toBeDisabled();
  });

  it("save is enabled when no description is entered", () => {
    const { getByText, getByPlaceholderText } = setUpComponent({});

    const input = getByPlaceholderText("item description");

    fireEvent.change(input, { target: { value: "" } });

    expect(getByText("save item")).not.toBeDisabled();
  });

  it("save is disabled when no name is entered", () => {
    const { getByText, getByPlaceholderText } = setUpComponent({});

    const input = getByPlaceholderText("item name");

    fireEvent.change(input, { target: { value: "" } });

    expect(getByText("save item")).toBeDisabled();
  });

  it("pressing save sends a gql request", async () => {
    const mutateMock = jest.fn(() => Promise.resolve({}));
    jest
      .spyOn(GQL, "useMutation")
      .mockReturnValue([mutateMock, { loading: false } as any]);
    const { getByText, getByPlaceholderText } = setUpComponent({});

    const input = getByPlaceholderText("item name");
    fireEvent.change(input, { target: { value: "Test Item Name" } });

    const saveButton = getByText("save item");
    fireEvent.click(saveButton);

    await waitFor(() =>
      expect(mutateMock).toHaveBeenCalledWith({
        variables: {
          id: "campaign-id",
          input: {
            id: "item-id",
            description: "Test description",
            name: "Test Item Name",
          },
        },
      })
    );
  });
});
