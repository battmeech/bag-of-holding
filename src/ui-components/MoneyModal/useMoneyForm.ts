import { useEffect, useState } from "react";
import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";

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
  errors: FieldErrors<MoneyFormInputs>;
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const modifyMoney = (_: Modification) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit: SubmitHandler<MoneyFormInputs> = async (__) => {
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
    saveLoading: false,
    formProps,
    isSaveEnabled,
    handleSubmit,
  };
};
