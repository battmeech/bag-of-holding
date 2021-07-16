import React from "react";
import { render, fireEvent } from "shared";
import { CampaignLoaded } from "../CampaignLoaded";
import { FetchCampaign_fetchCampaign_Campaign as Campaign } from "campaign/gql";
import { createCampaign } from "./testData";

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

  it("renders the add item modal when clicking the plus button", () => {
    const { getByLabelText, getByText } = setUpComponent({});

    const plusButton = getByLabelText("add item");

    fireEvent.click(plusButton);

    expect(getByText("new item")).toBeInTheDocument();
  });

  it("renders the add item modal when clicking the add item button", () => {
    const campaign = { ...createCampaign(), items: [] };
    const { getByText } = setUpComponent({ campaign });

    const addItem = getByText("add an item");

    fireEvent.click(addItem);

    expect(getByText("new item")).toBeInTheDocument();
  });
});
