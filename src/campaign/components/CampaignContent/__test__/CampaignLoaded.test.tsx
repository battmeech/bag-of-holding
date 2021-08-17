import userEvent from "@testing-library/user-event";
import { FetchCampaign_campaign_Campaign as Campaign } from "campaign/gql";
import React from "react";
import { fireEvent, render } from "shared";
import { createCampaign, createItem } from "shared/testData";
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
    // Setup
    const { getByLabelText, getByText } = setUpComponent({});

    // Run
    const piggyBank = getByLabelText("edit money");
    fireEvent.click(piggyBank);

    // Assert
    expect(getByText("modify money")).toBeInTheDocument();
  });

  it("renders the add item modal when clicking the plus button", () => {
    // Setup
    const { getByLabelText, getByText } = setUpComponent({});

    // Run
    const plusButton = getByLabelText("add item");
    fireEvent.click(plusButton);

    // Assert
    expect(getByText("new item")).toBeInTheDocument();
  });

  it("renders the add item modal when clicking the add item button", () => {
    // Setup
    const campaign = { ...createCampaign(), items: [] };
    const { getByText } = setUpComponent({ campaign });

    // Run
    const addItem = getByText("add an item");
    fireEvent.click(addItem);

    // Assert
    expect(getByText("new item")).toBeInTheDocument();
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

  describe("filtering", () => {
    const items = [
      createItem({
        id: "1",
        name: "test1",
        description: "description1",
        tags: ["tag-1", "tag-2"],
      }),
      createItem({
        id: "2",
        name: "test2",
        description: "description2",
        tags: ["tag-3"],
      }),
      createItem({ id: "3", name: "test3", description: "description3" }),
      createItem({ id: "4", name: "test4", description: "description4" }),
    ];
    it("filters items by name when searched", () => {
      // Setup
      const campaign = { ...createCampaign(), items };
      const { getByText, queryByText, getByPlaceholderText } = setUpComponent({
        campaign,
      });

      // Run
      const textbox = getByPlaceholderText(/search/i);
      userEvent.type(textbox, "test3");

      // Assert
      expect(getByText(/test3/)).toBeVisible();
      expect(queryByText(/test1/)).not.toBeInTheDocument();
      expect(queryByText(/test2/)).not.toBeInTheDocument();
      expect(queryByText(/test4/)).not.toBeInTheDocument();
    });

    it("filters items by description when searched", () => {
      // Setup
      const campaign = { ...createCampaign(), items };
      const { getByText, queryByText, getByPlaceholderText } = setUpComponent({
        campaign,
      });

      // Run
      const textbox = getByPlaceholderText(/search/i);
      userEvent.type(textbox, "description2");

      // Assert
      expect(getByText(/test2/)).toBeVisible();
      expect(queryByText(/test1/)).not.toBeInTheDocument();
      expect(queryByText(/test3/)).not.toBeInTheDocument();
      expect(queryByText(/test4/)).not.toBeInTheDocument();
    });

    it("filters items by tag when a tag is clicked", () => {
      // Setup
      const campaign = { ...createCampaign(), items };
      const { getByText, queryByText } = setUpComponent({
        campaign,
      });

      // Run
      const tags = getByText("tag-1");
      fireEvent.click(tags);

      // Assert
      expect(getByText(/test1/)).toBeVisible();
      expect(queryByText(/test2/)).not.toBeInTheDocument();
      expect(queryByText(/test3/)).not.toBeInTheDocument();
      expect(queryByText(/test4/)).not.toBeInTheDocument();
    });

    it("clears the filter text when the clear button is pressed", () => {
      // Setup
      const campaign = { ...createCampaign(), items };
      const { getByPlaceholderText, getByLabelText } = setUpComponent({
        campaign,
      });

      // Run
      const textbox = getByPlaceholderText(/search for items/i);
      userEvent.type(textbox, "filter");
      fireEvent.click(getByLabelText(/clear filter/i));

      // Assert
      expect(textbox).toHaveValue("");
    });
  });
});
