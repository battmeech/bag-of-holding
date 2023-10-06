import { useEffect, useState } from "react";
import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormSetValue,
} from "react-hook-form";
import { Item } from "@ui-views/Campaign/types";
import { trpc } from "@trpc-client/client";

export type FormProps = {
  errors: FieldErrors<ItemFormInputs>;
  setValue: UseFormSetValue<ItemFormInputs>;
  values: ItemFormInputs;
};

type ItemFormInputs = {
  name: string;
  description?: string;
  quantity?: number;
  tags?: string[];
};

const useItem = (defaultValues?: Partial<ItemFormInputs>) => {
  const {
    reset,
    formState: { errors, isValid, isDirty },
    setValue,
    watch,
    getValues,
    handleSubmit,
  } = useForm<ItemFormInputs>({
    defaultValues: defaultValues || {
      description: "",
      name: "",
      quantity: 1,
      tags: [],
    },
  });

  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  const name = getValues("name");

  useEffect(() => {
    if (isValid && name && isDirty) setIsSaveEnabled(true);
    else setIsSaveEnabled(false);
  }, [name, isValid, isDirty]);

  const formProps: FormProps = {
    errors,
    setValue,
    values: watch(),
  };

  return {
    reset,
    formProps,
    handleSubmit,
    isSaveEnabled,
  };
};

export const useCreateItem = ({
  campaignId,
  onSuccessCallback,
}: {
  campaignId: string;
  onSuccessCallback: () => void;
}) => {
  const { isSaveEnabled, formProps, handleSubmit } = useItem();
  const trpcContext = trpc.useContext();
  const mutation = trpc.item.create.useMutation({
    onSuccess: () => {
      trpcContext.campaign.getById.invalidate({ id: campaignId });
    },
  });

  const onSubmit: SubmitHandler<ItemFormInputs> = async (data) => {
    mutation.mutate({
      campaignId,
      itemName: data.name,
      quantity: data.quantity,
      tags: data.tags,
      description: data.description,
    });
    onSuccessCallback();
  };

  return {
    saveLoading: false,
    isSaveEnabled,
    formProps,
    saveItem: handleSubmit(onSubmit),
  };
};

export const useEditItem = ({
  existingItem: { id, campaignId, name, description, tags, quantity },
  onSuccessCallback,
}: {
  existingItem: Item;
  onSuccessCallback: () => void;
}) => {
  const { isSaveEnabled, formProps, handleSubmit } = useItem({
    name,
    description: description || undefined,
    tags,
    quantity,
  });

  const trpcContext = trpc.useContext();
  const mutation = trpc.item.update.useMutation({
    onSuccess: () => {
      trpcContext.campaign.getById.invalidate({ id: campaignId });
    },
  });

  const onSubmit: SubmitHandler<ItemFormInputs> = async (input) => {
    mutation.mutate({
      itemId: id,
      itemName: input.name,
      description: input.description,
      quantity: input.quantity,
      tags: input.tags,
    });
    onSuccessCallback();
  };

  return {
    saveLoading: mutation.isLoading,
    isSaveEnabled,
    formProps,
    saveItem: handleSubmit(onSubmit),
  };
};
