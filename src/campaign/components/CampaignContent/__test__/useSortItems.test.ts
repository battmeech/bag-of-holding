import { act, renderHook } from "@testing-library/react-hooks";
import { useSortItems } from "../useSortItems";
import { FetchCampaign_campaign_Campaign_items as Item } from "campaign/gql";

describe("useSortItems", () => {
  const setupHook = () => renderHook(() => useSortItems());

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("sorts items by ascending date created", () => {
    const { result } = setupHook();

    const items: Item[] = [
      { id: "oldest", createdAt: new Date(1), name: "a" } as Item,
      { id: "newest", createdAt: new Date(1000), name: "b" } as Item,
    ];

    const actual = items.sort(result.current.sortItems);

    expect(actual[0].id).toStrictEqual("newest");
  });

  it("sorts items by descending date created", () => {
    const { result } = setupHook();

    act(() => {
      result.current.toggleSortingOrder();
    });

    const items: Item[] = [
      { id: "oldest", createdAt: new Date(1), name: "a" } as Item,
      { id: "newest", createdAt: new Date(1000), name: "b" } as Item,
    ];

    const actual = items.sort(result.current.sortItems);

    expect(actual[0].id).toStrictEqual("oldest");
  });
});
