import { Tooltip, useColorModeValue } from "@chakra-ui/react";
import { RiCopperCoinFill } from "react-icons/ri";
import { FC } from "react";

export type CurrencyDenomination =
  | "electrum"
  | "platinum"
  | "gold"
  | "silver"
  | "copper";

export type CoinProps = {
  denomination: CurrencyDenomination;
};

type CoinColor = {
  darkMode: string;
  lightMode: string;
};

const colorMap: Record<CurrencyDenomination, CoinColor> = {
  electrum: { lightMode: "#ffd700", darkMode: "#f2e279" },
  platinum: { lightMode: "#a0a09e", darkMode: "#e5e4e2" },
  copper: { lightMode: "#c26737", darkMode: "#c26737" },
  silver: { lightMode: "#868686", darkMode: "#c0c0c0" },
  gold: { lightMode: "#d4af37", darkMode: "#d4af37" },
};

export const Coin: FC<CoinProps> = ({ denomination }) => {
  return (
    <Tooltip label={denomination}>
      <span>
        <RiCopperCoinFill
          aria-label={denomination}
          color={useColorModeValue(
            colorMap[denomination].lightMode,
            colorMap[denomination].darkMode
          )}
        />
      </span>
    </Tooltip>
  );
};
