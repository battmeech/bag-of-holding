import { Modal } from "@chakra-ui/react";
import { AddItemModal } from "campaign/components/ItemModal/AddItemModal";
import React from "react";
import { render, waitFor } from "shared";

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

  it("Renders a modal with close and save buttons", async () => {
    const { getByText } = setUpComponent({});

    await waitFor(() => {
      expect(getByText("close")).toBeInTheDocument();
      expect(getByText("save item")).toBeInTheDocument();
    });
  });

  it("save is disabled when no name is entered", async () => {
    const { getByText } = setUpComponent({});

    await waitFor(() => {
      expect(getByText("save item")).toBeDisabled();
    });
  });
});
