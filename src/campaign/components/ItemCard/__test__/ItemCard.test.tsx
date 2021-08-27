import { ItemCard } from "campaign/components/ItemCard";
import { FetchCampaign_campaign_Campaign_items as Item } from "campaign/gql";
import React from "react";
import { fireEvent, render } from "shared";
import { createItem } from "shared/testData";

describe("ItemCard", () => {
  const tagClickMock = jest.fn();
  afterEach(() => jest.resetAllMocks());
  const setUpComponent = ({
    item = createItem({}),
  }: {
    campaignId?: string;
    item?: Item;
  }) => {
    const rendered = render(<ItemCard onTagClick={tagClickMock} item={item} />);
    return rendered;
  };

  it("renders information about the item", () => {
    const { getByText } = setUpComponent({});

    expect(getByText("Test name")).toBeInTheDocument();
    expect(getByText("Test description")).toBeInTheDocument();
  });

  it("clicking the options menu brings up the 2 options", () => {
    const { getByLabelText, getByText } = setUpComponent({});

    const optionsMenu = getByLabelText("item options");

    fireEvent.click(optionsMenu);

    expect(getByText("edit item")).toBeInTheDocument();
    expect(getByText("delete item")).toBeInTheDocument();
  });

  it("clicking delete item brings up the delete confirmation modal", () => {
    const { getByLabelText, getByText } = setUpComponent({});

    const optionsMenu = getByLabelText("item options");

    fireEvent.click(optionsMenu);

    const deleteItemButton = getByText("delete item");

    fireEvent.click(deleteItemButton);

    expect(getByText("it will be deleted forever")).toBeInTheDocument();
  });

  it("clicking the notes button displays the notes", () => {
    const { getByLabelText, getByText } = setUpComponent({});

    const notesButton = getByLabelText("view notes");

    fireEvent.click(notesButton);

    expect(getByText("item notes")).toBeInTheDocument();
  });

  it("displays a blank note icon when there's no notes", () => {
    const { getByTestId } = setUpComponent({
      item: createItem({ notes: "" }),
    });

    expect(getByTestId("no-notes-icon")).toBeInTheDocument();
  });

  it("displays a note icon when there are notes", () => {
    const { getByTestId } = setUpComponent({});

    expect(getByTestId("notes-icon")).toBeInTheDocument();
  });

  it("calls the onTagClick function with the tag name when a tag is clicked", () => {
    const { getByText } = setUpComponent({});

    const tag = getByText("tag-a");

    fireEvent.click(tag);

    expect(tagClickMock).toHaveBeenCalledWith("tag-a");
  });
});
