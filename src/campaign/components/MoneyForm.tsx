import { SimpleGrid } from "@chakra-ui/react";
import { FormProps } from "campaign/hooks/useMoneyForm";
import React from "react";
import { CurrencyInput } from "./CurrencyInput";

export function MoneyForm({ values, setValues, errors }: FormProps) {
  return (
    <SimpleGrid columns={1} spacing={2}>
      <CurrencyInput
        denomination="platinum"
        value={values.platinum}
        error={errors.has("platinum")}
        onChange={(value) => setValues({ key: "platinum", value })}
      />

      <CurrencyInput
        denomination="gold"
        value={values.gold}
        error={errors.has("gold")}
        onChange={(value) => setValues({ key: "gold", value })}
      />

      <CurrencyInput
        denomination="electrum"
        value={values.electrum}
        error={errors.has("electrum")}
        onChange={(value) => setValues({ key: "electrum", value })}
      />

      <CurrencyInput
        denomination="silver"
        value={values.silver}
        error={errors.has("silver")}
        onChange={(value) => setValues({ key: "silver", value })}
      />

      <CurrencyInput
        denomination="copper"
        value={values.copper}
        error={errors.has("copper")}
        onChange={(value) => setValues({ key: "copper", value })}
      />
    </SimpleGrid>
  );
}
