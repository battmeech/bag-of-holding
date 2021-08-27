import { FetchCampaign_campaign_Campaign_items as Item } from "campaign/gql";
import { useEffect, useState } from "react";

export const useFilterItems = (items: Item[] = []) => {
  const [filterText, setFilterText] = useState("");
  const [filteredItems, setFilteredItems] = useState(items ?? []);

  useEffect(() => {
    const newFilteredItems = items.filter(
      (item) =>
        item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.description?.toLowerCase().includes(filterText.toLowerCase()) ||
        item.tags.filter((tag) =>
          tag.toLowerCase().includes(filterText.toLowerCase())
        ).length > 0
    );
    setFilteredItems(newFilteredItems ?? []);
  }, [filterText, items]);

  return { filterText, setFilterText, filteredItems };
};
