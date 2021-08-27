import { useMutation } from "@apollo/client";
import {
  ModifyMoney,
  ModifyMoneyGQL,
  ModifyMoneyVariables,
} from "campaign/gql";
import { useEffect, useState } from "react";
import {
  DeepMap,
  FieldError,
  SubmitHandler,
  useForm,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { MoneyModification } from "../../../../__generated__/globalTypes";

type Modification = "add" | "deduct";

const initialValue = {
  platinum: 0,
  gold: 0,
  electrum: 0,
  silver: 0,
  copper: 0,
};

type MoneyFormInputs = {
  platinum: number;
  gold: number;
  electrum: number;
  silver: number;
  copper: number;
};

export type FormProps = {
  errors: DeepMap<MoneyFormInputs, FieldError>;
  setValue: UseFormSetValue<MoneyFormInputs>;
  values: MoneyFormInputs;
};

const useSaveEnabled = (getValues: UseFormGetValues<MoneyFormInputs>) => {
  const { copper, platinum, electrum, gold, silver } = getValues();
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  useEffect(() => {
    if (!copper && !platinum && !electrum && !gold && !silver) {
      setIsSaveEnabled(false);
    } else if (
      isNaN(copper) ||
      isNaN(platinum) ||
      isNaN(electrum) ||
      isNaN(gold) ||
      isNaN(silver)
    ) {
      setIsSaveEnabled(false);
    } else setIsSaveEnabled(true);
  }, [copper, platinum, electrum, gold, silver]);

  return isSaveEnabled;
};

export const useMoneyForm = ({
  campaignId,
  onSuccessCallback,
}: {
  campaignId: string;
  onSuccessCallback: () => void;
}) => {
  const {
    handleSubmit: submit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm<MoneyFormInputs>({
    defaultValues: initialValue,
  });

  const isSaveEnabled = useSaveEnabled(getValues);

  const [mutate, { loading }] = useMutation<ModifyMoney, ModifyMoneyVariables>(
    ModifyMoneyGQL
  );

  const modifyMoney = (modification: Modification) => {
    const map: Record<Modification, MoneyModification> = {
      add: MoneyModification.ADD,
      deduct: MoneyModification.DEDUCT,
    };

    const onSubmit: SubmitHandler<MoneyFormInputs> = async (data) => {
      await mutate({
        variables: {
          id: campaignId,
          input: { ...data, modification: map[modification] },
        },
      });
      onSuccessCallback();
    };

    return onSubmit;
  };

  const formProps: FormProps = {
    errors,
    setValue,
    values: watch(),
  };

  const handleSubmit = (modification: Modification) => {
    return submit(modifyMoney(modification));
  };

  return {
    saveLoading: loading,
    formProps,
    isSaveEnabled,
    handleSubmit,
  };
};
