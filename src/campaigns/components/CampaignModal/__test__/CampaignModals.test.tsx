import { useMutation } from "@apollo/client";
import { Modal } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { fireEvent, render, waitFor } from "shared";
import { CampaignModal } from "../CampaignModal";

jest.mock("next/router");
jest.mock("@apollo/client");

describe("CampaignModal", () => {
  const setUpComponent = () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    const mutateMock = jest.fn();
    mutateMock.mockResolvedValue({
      data: { createCampaign: { __typename: "Campaign", id: "123" } },
    });

    (useMutation as jest.Mock).mockReturnValue([
      mutateMock,
      { loading: false },
    ]);

    const rendered = render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <CampaignModal />
      </Modal>
    );
    return { ...rendered, push };
  };

  it("renders a modal with close and save buttons", () => {
    const { getByText } = setUpComponent();

    expect(getByText("close")).toBeInTheDocument();
    expect(getByText("create campaign")).toBeInTheDocument();
  });

  it("save is disabled on initial load", () => {
    const { getByText } = setUpComponent();

    expect(getByText("create campaign")).toBeDisabled();
  });

  it("save is enabled when a name is entered", () => {
    const { getByText, getByPlaceholderText } = setUpComponent();

    const input = getByPlaceholderText("campaign name");

    fireEvent.change(input, { target: { value: "name" } });

    expect(getByText("create campaign")).not.toBeDisabled();
  });

  it("calls router push on mutate success", async () => {
    const { getByText, getByPlaceholderText, push } = setUpComponent();

    const input = getByPlaceholderText("campaign name");

    fireEvent.change(input, { target: { value: "name" } });
    fireEvent.click(getByText("create campaign"));

    await waitFor(() => {
      expect(push).toHaveBeenCalledTimes(1);
    });
  });
});
