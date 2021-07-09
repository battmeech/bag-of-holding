import { Flex, FlexProps, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { RiCopperCoinFill } from "react-icons/ri";

export type CurrencyDenomination =
  | "electrum"
  | "platinum"
  | "gold"
  | "silver"
  | "copper";

export type CurrencyProps = {
  denomination: CurrencyDenomination;
  value?: number;
} & FlexProps;

const colorMap: Record<CurrencyDenomination, string> = {
  electrum: "#f2e279",
  platinum: "#e5e4e2",
  copper: "#c26737",
  silver: "c0c0c0",
  gold: "#d4af37",
};

export const Currency: React.FC<CurrencyProps> = ({
  denomination,
  value,
  ...flexProps
}) => {
  return (
    <Flex {...flexProps} display="flex" alignItems="center">
      <Tooltip label={denomination}>
        <span>
          <RiCopperCoinFill
            aria-label={denomination}
            color={colorMap[denomination]}
          />
        </span>
      </Tooltip>
      {value && <Text ml={1}>{value}</Text>}
    </Flex>
  );
};
