import { HStack, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import { Currency } from "./Currency";

type CurrencyDisplayProps = {
  platinum: number;
  gold: number;
  electrum: number;
  silver: number;
  copper: number;
};

export const CurrencyDisplay = ({
  platinum,
  gold,
  electrum,
  silver,
  copper,
}: CurrencyDisplayProps) => {
  return (
    <HStack>
      <Wrap>
        <WrapItem>
          <Currency denomination="platinum" value={platinum} />
        </WrapItem>
        <WrapItem>
          <Currency denomination="gold" value={gold} />
        </WrapItem>
        <WrapItem>
          <Currency denomination="electrum" value={electrum} />
        </WrapItem>
        <WrapItem>
          <Currency denomination="silver" value={silver} />
        </WrapItem>
        <WrapItem>
          <Currency denomination="copper" value={copper} />
        </WrapItem>
      </Wrap>
    </HStack>
  );
};
