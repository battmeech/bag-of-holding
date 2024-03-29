import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";
import { Coin, CurrencyDenomination } from "@ui-components/Currency/Coin";

type CurrencyInputProps = {
  denomination: CurrencyDenomination;
  value: number;
  error: boolean;
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

    if (newValue < 0) newValue = 0;

    onChange(newValue);
  };

  return (
    <InputGroup>
      <InputLeftAddon>
        <Coin denomination={denomination} />
      </InputLeftAddon>
      <Input
        type="number"
        isInvalid={error}
        placeholder={denomination}
        value={value}
        onChange={(event) => onChange(parseInt(event.target.value))}
      />
      <InputRightAddon>
        <Box>
          <IconButton
            variant="ghost"
            onClick={add}
            aria-label={`add-${denomination}`}
            size="sm"
            icon={<AddIcon />}
            mr={1}
            disabled={isNaN(value)}
          />

          <IconButton
            variant="ghost"
            disabled={value === 0 || isNaN(value)}
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
