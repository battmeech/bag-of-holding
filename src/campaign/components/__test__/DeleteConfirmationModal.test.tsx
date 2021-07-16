import * as GQL from "@apollo/client";
import { Modal } from "@chakra-ui/react";
import React from "react";
import { fireEvent, render, waitFor } from "shared";
import { DeleteConfirmationModal } from "../DeleteConfirmationModal";

describe("DeleteConfirmationModal", () => {
  const setUpComponent = ({
    campaignId = "campaign-id",
    itemId = "item-id",
  }: {
    campaignId?: string;
    itemId?: string;
  }) => {
    const rendered = render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <DeleteConfirmationModal campaignId={campaignId} itemId={itemId} />
      </Modal>
    );
    return rendered;
  };

  it("renders a modal with close and save buttons", () => {
    const { getByText } = setUpComponent({});

    expect(getByText("nope")).toBeInTheDocument();
    expect(getByText("yep")).toBeInTheDocument();
  });

  it("pressing delete sends a gql mutation", async () => {
    const mutateMock = jest.fn(() => Promise.resolve({}));
    jest
      .spyOn(GQL, "useMutation")
      .mockReturnValue([mutateMock, { loading: false } as any]);
    const { getByText } = setUpComponent({});

    const deleteButton = getByText("yep");
    fireEvent.click(deleteButton);

    await waitFor(() => expect(mutateMock).toHaveBeenCalledWith());
  });
});
