import { Flex, FlexProps, Text } from "@chakra-ui/react";
import React from "react";
import { Coin, CurrencyDenomination } from "./Coin";

type CurrencyProps = {
  denomination: CurrencyDenomination;
  value: number;
} & FlexProps;

export const Currency: React.FC<CurrencyProps> = ({
  denomination,
  value,
  ...flexProps
}) => {
  return (
    <Flex {...flexProps} display="flex" alignItems="center">
      <Coin denomination={denomination} />
      <Text ml={1}>{value}</Text>
    </Flex>
  );
};
