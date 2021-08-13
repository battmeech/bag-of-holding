import { IconButton } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/tooltip";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";

export const Sorting = ({
  sortingOrder,
  toggleSortingOrder,
}: {
  sortingOrder: "asc" | "desc";
  toggleSortingOrder: () => void;
}) => {
  return (
    <Tooltip
      label={`sort by ${
        sortingOrder === "asc" ? "newest first" : "oldest first"
      }`}
    >
      <IconButton
        aria-label="switch sorting order"
        variant="ghost"
        size="lg"
        icon={
          sortingOrder === "asc" ? (
            <FaSortAmountDown data-testid="ascending-icon" />
          ) : (
            <FaSortAmountUp data-testid="descending-icon" />
          )
        }
        onClick={toggleSortingOrder}
      />
    </Tooltip>
  );
};
