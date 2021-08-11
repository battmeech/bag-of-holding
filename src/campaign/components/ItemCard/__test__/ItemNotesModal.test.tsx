import { Modal } from "@chakra-ui/react";
import React from "react";
import { fireEvent, render } from "shared";
import { ItemNotes } from "../ItemNotesModal";

describe("ItemNotesModal", () => {
  const setUpComponent = ({ notes = "test notes" }: { notes?: string }) => {
    const rendered = render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <ItemNotes
          campaignId="campaignId"
          itemId="itemId"
          currentNotes={notes}
        />
      </Modal>
    );
    return rendered;
  };

  it("Renders a modal with close and save buttons", () => {
    const { getByText } = setUpComponent({});

    expect(getByText("close")).toBeInTheDocument();
    expect(getByText("save changes")).toBeInTheDocument();
  });

  it("save is disabled when no note is entered", () => {
    const { getByText } = setUpComponent({});

    expect(getByText("save changes")).toBeDisabled();
  });

  it("entering a note enables the save button", () => {
    const { getByText, getByPlaceholderText } = setUpComponent({});

    const input = getByPlaceholderText("click here to add notes");

    fireEvent.change(input, { target: { value: "Test Item Name" } });

    expect(getByText("save changes")).not.toBeDisabled();
  });
});
