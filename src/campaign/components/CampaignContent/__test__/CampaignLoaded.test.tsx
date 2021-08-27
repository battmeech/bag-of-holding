import userEvent from "@testing-library/user-event";
import { FetchCampaign_campaign_Campaign as Campaign } from "campaign/gql";
import React from "react";
import { fireEvent, render, waitFor } from "shared";
import { createCampaign } from "shared/testData";
import { CampaignLoaded } from "../CampaignLoaded";

describe("CampaignLoaded", () => {
  const setUpComponent = ({
    campaign = createCampaign(),
  }: {
    campaign?: Campaign;
  }) => {
    const rendered = render(<CampaignLoaded campaign={campaign} />);
    return rendered;
  };
  it("renders the items in cards", () => {
    const { getByTestId } = setUpComponent({});

    expect(getByTestId("card-grid")).toBeInTheDocument();
  });

  it("renders a button when there are no cards", () => {
    const campaign = { ...createCampaign(), items: [] };
    const { getByText } = setUpComponent({ campaign });

    expect(getByText("add an item")).toBeInTheDocument();
  });

  it("renders the money modification modal when clicking the piggy bank", () => {
    const { getByLabelText, getByText } = setUpComponent({});

    const piggyBank = getByLabelText("edit money");
    fireEvent.click(piggyBank);

    expect(getByText("modify money")).toBeInTheDocument();
  });

  it("renders the add item modal when clicking the plus button", async () => {
    const { getByLabelText, getByText } = setUpComponent({});

    const plusButton = getByLabelText("add item");
    fireEvent.click(plusButton);

    await waitFor(() => {
      expect(getByText("new item")).toBeInTheDocument();
    });
  });

  it("renders the add item modal when clicking the add item button", async () => {
    const campaign = { ...createCampaign(), items: [] };
    const { getByText } = setUpComponent({ campaign });

    const addItem = getByText("add an item");
    fireEvent.click(addItem);

    await waitFor(() => {
      expect(getByText("new item")).toBeInTheDocument();
    });
  });

  it("renders a search input when items exist on the campaign", () => {
    const { getByPlaceholderText } = setUpComponent({});
    expect(getByPlaceholderText(/search/i)).toBeVisible();
  });

  it("does not render a search input when no items exist on the campaign ", () => {
    const campaign = { ...createCampaign(), items: [] };
    const { queryByPlaceholderText } = setUpComponent({ campaign });
    expect(queryByPlaceholderText(/search/i)).not.toBeInTheDocument();
  });

  it("clears the filter text when the clear button is pressed", () => {
    const { getByPlaceholderText, getByLabelText } = setUpComponent({});

    const textbox = getByPlaceholderText(/search for items/i);
    userEvent.type(textbox, "filter");
    fireEvent.click(getByLabelText(/clear filter/i));

    expect(textbox).toHaveValue("");
  });
});
