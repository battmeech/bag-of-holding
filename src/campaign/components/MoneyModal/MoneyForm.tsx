import { SimpleGrid } from "@chakra-ui/react";
import { FormProps } from "./useMoneyForm";
import { CurrencyInput } from "./CurrencyInput";

export function MoneyForm({ values, setValue, errors }: FormProps) {
  return (
    <SimpleGrid columns={1} spacing={2}>
      <CurrencyInput
        denomination="platinum"
        value={values.platinum}
        error={!!errors.platinum}
        onChange={(value) => setValue("platinum", Number(value))}
      />

      <CurrencyInput
        denomination="gold"
        value={values.gold}
        error={!!errors.gold}
        onChange={(value) => setValue("gold", Number(value))}
      />

      <CurrencyInput
        denomination="electrum"
        value={values.electrum}
        error={!!errors.electrum}
        onChange={(value) => setValue("electrum", Number(value))}
      />

      <CurrencyInput
        denomination="silver"
        value={values.silver}
        error={!!errors.silver}
        onChange={(value) => setValue("silver", Number(value))}
      />

      <CurrencyInput
        denomination="copper"
        value={values.copper}
        error={!!errors.copper}
        onChange={(value) => setValue("copper", Number(value))}
      />
    </SimpleGrid>
  );
}
