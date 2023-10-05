import { useEffect, useState } from "react";
import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { trpc } from "@trpc-client/client";

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
  campaignId,
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

  const trpcContext = trpc.useContext();
  const mutation = trpc.campaign.alterMoney.useMutation({
    onSuccess: () => {
      trpcContext.campaign.getById.invalidate({ id: campaignId });
    },
  });

  const modifyMoney = (modification: Modification) => {
    const onSubmit: SubmitHandler<MoneyFormInputs> = async (data) => {
      mutation.mutate({ campaignId, modification, alterations: data });
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
