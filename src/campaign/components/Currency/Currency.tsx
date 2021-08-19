import { Flex, Text } from "@chakra-ui/react";
import { Coin, CurrencyDenomination } from "./Coin";

type CurrencyProps = {
  denomination: CurrencyDenomination;
  value: number;
};

export const Currency: React.FC<CurrencyProps> = ({ denomination, value }) => {
  return (
    <Flex alignItems="center">
      <Coin denomination={denomination} />
      <Text ml={1}>{value}</Text>
    </Flex>
  );
};
