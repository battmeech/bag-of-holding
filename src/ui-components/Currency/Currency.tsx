import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Coin, CurrencyDenomination } from "@ui-components/Currency/Coin";

type CurrencyProps = {
  denomination: CurrencyDenomination;
  value: number;
};

export const Currency: FC<CurrencyProps> = ({ denomination, value }) => {
  return (
    <Flex alignItems="center">
      <Coin denomination={denomination} />
      <Text ml={1}>{value}</Text>
    </Flex>
  );
};
