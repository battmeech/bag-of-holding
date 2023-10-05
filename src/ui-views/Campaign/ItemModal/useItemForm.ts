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

const useItem = () => {
  const {
    reset,
    formState: { errors, isValid },
    setValue,
    watch,
    getValues,
    handleSubmit,
  } = useForm<ItemFormInputs>({
    defaultValues: { description: "", name: "", quantity: 1, tags: [] },
  });

  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  const name = getValues("name");

  useEffect(() => {
    if (isValid && name) setIsSaveEnabled(true);
    else setIsSaveEnabled(false);
  }, [name, isValid]);

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
    mutation.mutate({ campaignId, itemName: data.name });
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
  existingItem: { name, description, tags, quantity, id },
  onSuccessCallback,
}: {
  existingItem: Item;
  onSuccessCallback: () => void;
}) => {
  const { isSaveEnabled, formProps, handleSubmit } = useItem();

  const { setValue } = formProps;

  useEffect(() => {
    setValue("name", name);
    setValue("description", description || undefined);
    setValue("quantity", quantity);
    setValue("tags", tags);
  }, []);

  const onSubmit: SubmitHandler<ItemFormInputs> = async (input) => {
    alert(`TODO: update item ${input.name} ${id}`);
    onSuccessCallback();
  };

  return {
    saveLoading: false,
    isSaveEnabled,
    formProps,
    saveItem: handleSubmit(onSubmit),
  };
};
