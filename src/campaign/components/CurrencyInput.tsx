import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";
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
    onChange(newValue);
  };

  return (
    <InputGroup>
      <InputLeftAddon>
        <Currency denomination={denomination} />
      </InputLeftAddon>
      <Input
        error={error}
        type="number"
        placeholder={denomination}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <InputRightAddon>
        <Box>
          <IconButton
            variant="ghost"
            onClick={add}
            aria-label={`add-${denomination}`}
            size="sm"
            icon={<AddIcon />}
          />

          <IconButton
            variant="ghost"
            disabled={value === 0}
            onClick={deduct}
            aria-label={`deduct-${denomination}`}
            size="sm"
            icon={<MinusIcon />}
          />
        </Box>
      </InputRightAddon>
    </InputGroup>
  );
};
