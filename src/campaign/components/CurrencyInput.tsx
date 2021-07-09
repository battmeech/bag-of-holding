import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import React from "react";
import { Currency, CurrencyDenomination } from "./Currency";

type CurrencyInputProps = {
  denomination: CurrencyDenomination;
  value: number;
  error: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: number) => void;
};

export const CurrencyInput = ({
  denomination,
  value,
  error,
  onChange,
}: CurrencyInputProps) => {
  const add = (event: any) => {
    let newValue = value;
    if (event.shiftKey) {
      newValue += 10;
    } else if (event.altKey) {
      newValue += 100;
    } else {
      newValue += 1;
    }

    if (newValue < 0) newValue = 0;
    onChange(newValue);
  };

  const deduct = (event: any) => {
    let newValue = value;
    if (event.shiftKey) {
      newValue -= 10;
    } else if (event.altKey) {
      newValue -= 100;
    } else {
      newValue -= 1;
    }

    if (newValue < 0) newValue = 0;
    onChange(newValue);
  };

  return (
    <Box
      display="flex"
      py={0.5}
      px={2}
      borderWidth="1px"
      borderRadius="lg"
      borderColor={error ? "red.300" : ""}
    >
      <Currency denomination={denomination} value={value} />

      <Box flex="1 0 auto" />

      <Box display="grid">
        <IconButton
          variant="ghost"
          onClick={add}
          aria-label={`add-${denomination}`}
          size="xs"
          icon={<AddIcon />}
        />

        <IconButton
          variant="ghost"
          disabled={value === 0}
          onClick={deduct}
          aria-label={`deduct-${denomination}`}
          size="xs"
          icon={<MinusIcon />}
        />
      </Box>
    </Box>
  );
};
