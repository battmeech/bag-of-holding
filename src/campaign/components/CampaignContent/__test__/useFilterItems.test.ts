import { useFilterItems } from "../useFilterItems";
import { FetchCampaign_campaign_Campaign_items as Item } from "campaign/gql";
import { renderHook, act } from "@testing-library/react-hooks";
import { createItem } from "shared/testData";
import { waitFor } from "shared";

describe("useFilterItems", () => {
  const setupHook = (items: Item[] = []) =>
    renderHook(() => useFilterItems(items));

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

  it("filters items by name when searched", async () => {
    const { result } = setupHook(items);

    act(() => {
      result.current.setFilterText("test3");
    });

    await waitFor(() => {
      expect(result.current.filteredItems[0].name).toStrictEqual("test3");
      expect(result.current.filteredItems.length).toStrictEqual(1);
    });
  });

  it("filters items by description when searched", async () => {
    const { result } = setupHook(items);

    act(() => {
      result.current.setFilterText("description2");
    });

    await waitFor(() => {
      expect(result.current.filteredItems[0].name).toStrictEqual("test2");
      expect(result.current.filteredItems.length).toStrictEqual(1);
    });
  });
});
