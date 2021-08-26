import { Modal } from "@chakra-ui/react";
import { EditItemModal } from "campaign/components/ItemModal/EditItemModal";
import { EditItem_editItem_Item as Item } from "campaign/gql";
import React from "react";
import { fireEvent, render, waitFor } from "shared";
import { createItem } from "shared/testData";

describe("EditItemModal", () => {
  const setupComponent = ({ item = createItem({}) }: { item?: Item }) => {
    const rendered = render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <EditItemModal item={item} />
      </Modal>
    );
    return rendered;
  };

  it("renders a modal with close and save buttons", () => {
    const { getByText } = setupComponent({});

    expect(getByText("close")).toBeInTheDocument();
    expect(getByText("save item")).toBeInTheDocument();
  });

  it("save is enabled on modal load is entered", async () => {
    const { getByText } = setupComponent({});

    await waitFor(() => {
      expect(getByText("save item")).not.toBeDisabled();
    });
  });

  it("save is enabled when no description is entered", async () => {
    const { getByText, getByPlaceholderText } = setupComponent({});

    const input = getByPlaceholderText("item description");
    fireEvent.change(input, { target: { value: "" } });

    await waitFor(() => {
      expect(getByText("save item")).not.toBeDisabled();
    });
  });

  it("save is disabled when no name is entered", async () => {
    const { getByText, getByPlaceholderText } = setupComponent({});

    const input = getByPlaceholderText("item name");
    fireEvent.change(input, { target: { value: "" } });

    await waitFor(() => {
      expect(getByText("save item")).toBeDisabled();
    });
  });
});
