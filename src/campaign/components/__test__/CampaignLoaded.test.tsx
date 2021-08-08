import React from "react";
import { render, fireEvent, screen } from "shared";
import { CampaignLoaded } from "../CampaignLoaded";
import { FetchCampaign_fetchCampaign_Campaign as Campaign } from "campaign/gql";
import { createCampaign, createItem } from "./testData";
import userEvent from "@testing-library/user-event";

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

  it("renders a search input", () => {
    render(<CampaignLoaded campaign={createCampaign()} />);
    expect(screen.getByPlaceholderText(/search/i)).toBeVisible();
  });

  describe("filtering", () => {
    const items = [
      createItem({ id: "1", name: "test1", description: "description1" }),
      createItem({ id: "2", name: "test2", description: "description2" }),
      createItem({ id: "3", name: "test3", description: "description3" }),
      createItem({ id: "4", name: "test4", description: "description4" }),
    ];
    it("filters items by name when searched", () => {
      render(
        <CampaignLoaded campaign={{ ...createCampaign(), items: items }} />
      );
      const textbox = screen.getByPlaceholderText(/search/i);
      userEvent.type(textbox, "test3");

      expect(screen.getByText(/test3/)).toBeVisible();

      expect(screen.queryByText(/test1/)).not.toBeInTheDocument();
      expect(screen.queryByText(/test2/)).not.toBeInTheDocument();
      expect(screen.queryByText(/test4/)).not.toBeInTheDocument();
    });

    it("filters items by description when searched", () => {
      render(
        <CampaignLoaded campaign={{ ...createCampaign(), items: items }} />
      );
      const textbox = screen.getByPlaceholderText(/search/i);
      userEvent.type(textbox, "description2");

      expect(screen.getByText(/test2/)).toBeVisible();

      expect(screen.queryByText(/test1/)).not.toBeInTheDocument();
      expect(screen.queryByText(/test3/)).not.toBeInTheDocument();
      expect(screen.queryByText(/test4/)).not.toBeInTheDocument();
    });
  });
});
