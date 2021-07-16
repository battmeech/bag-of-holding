import { useMutation } from "@apollo/client";
import {
  ModifyMoney,
  ModifyMoneyGQL,
  ModifyMoneyVariables,
} from "campaign/gql";
import { useEffect, useState } from "react";
import { MoneyModification } from "../../../__generated__/globalTypes";

type Values = {
  platinum: number;
  gold: number;
  electrum: number;
  silver: number;
  copper: number;
};

type Modification = "add" | "deduct";

export type FormProps = {
  errors: Map<keyof Values, boolean>;
  // eslint-disable-next-line no-unused-vars
  setValues: (value: { key: keyof Values; value: number | string }) => void;
  values: Values;
};

const validate = (
  errors: Map<keyof Values, boolean>,
  key: keyof Values,
  value: number | string
) => {
  if (typeof value === "string") {
    if (value === "") {
      errors.set(key, true);
    } else {
      errors.delete(key);
    }
  } else {
    if (value < 0) errors.set(key, true);
    else errors.delete(key);
  }

  return errors;
};

const initialValue = {
  platinum: 0,
  gold: 0,
  electrum: 0,
  silver: 0,
  copper: 0,
};

export const useMoneyForm = ({
  campaignId,
  onSuccessCallback,
}: {
  campaignId: string;
  onSuccessCallback: () => void;
}) => {
  const [money, setMoney] = useState<Values>(initialValue);
  const [errors, setErrors] = useState(new Map<keyof Values, boolean>());
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  const setValues = ({
    key,
    value,
  }: {
    key: keyof Values;
    value: number | string;
  }) => {
    const newValue: Record<string, any> = {};
    const numValue = Number(value);

    if (value === "") newValue[key] = "";
    else if (!isNaN(numValue) && value >= 0) newValue[key] = numValue;
    else if (isNaN(numValue)) return;
    setMoney((currentState) => ({
      ...currentState,
      ...newValue,
    }));
    setErrors(validate(errors, key, value));
  };

  const [mutate, { loading }] = useMutation<ModifyMoney, ModifyMoneyVariables>(
    ModifyMoneyGQL
  );

  const resetForm = () => {
    setMoney(initialValue);
  };

  useEffect(() => {
    if (errors.size > 0) setIsSaveEnabled(false);
    else if (
      money.copper === 0 &&
      money.silver === 0 &&
      money.electrum === 0 &&
      money.gold === 0 &&
      money.platinum === 0
    )
      setIsSaveEnabled(false);
    else setIsSaveEnabled(true);
  }, [errors, money]);

  const modifyMoney = async (modification: Modification) => {
    const map: Record<Modification, MoneyModification> = {
      add: MoneyModification.ADD,
      deduct: MoneyModification.DEDUCT,
    };
    await mutate({
      variables: {
        id: campaignId,
        input: { ...money, modification: map[modification] },
      },
    });
    onSuccessCallback();
    resetForm();
  };

  const formProps: FormProps = {
    setValues,
    values: money,
    errors,
  };

  return {
    formProps,
    resetForm,
    modifyMoney,
    loading,
    isSaveEnabled,
  };
};
