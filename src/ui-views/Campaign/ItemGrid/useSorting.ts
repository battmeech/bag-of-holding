import { useState } from "react";
import { Item } from "@ui-views/Campaign/types";

export const useSortItems = () => {
  const [sortingOrder, setSortingOrder] = useState<"asc" | "desc">("desc");

  const toggleSortingOrder = () => {
    if (sortingOrder === "asc") setSortingOrder("desc");
    else setSortingOrder("asc");
  };

  const sortByDate = (a: Item, b: Item) => {
    if (sortingOrder === "asc")
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  };

  const sortItems = (a: Item, b: Item) => sortByDate(a, b);
  return { sortItems, toggleSortingOrder, sortingOrder };
};
