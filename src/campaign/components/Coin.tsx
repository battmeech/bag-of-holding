import { Tooltip } from "@chakra-ui/react";
import React from "react";
import { RiCopperCoinFill } from "react-icons/ri";

export type CurrencyDenomination =
  | "electrum"
  | "platinum"
  | "gold"
  | "silver"
  | "copper";

export type CoinProps = {
  denomination: CurrencyDenomination;
};

const colorMap: Record<CurrencyDenomination, string> = {
  electrum: "#f2e279",
  platinum: "#e5e4e2",
  copper: "#c26737",
  silver: "c0c0c0",
  gold: "#d4af37",
};

export const Coin: React.FC<CoinProps> = ({ denomination }) => {
  return (
    <Tooltip label={denomination}>
      <span>
        <RiCopperCoinFill
          aria-label={denomination}
          color={colorMap[denomination]}
        />
      </span>
    </Tooltip>
  );
};
