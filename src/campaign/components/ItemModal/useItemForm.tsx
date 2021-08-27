import { useMutation } from "@apollo/client";
import {
  AddItem,
  AddItemGQL,
  AddItemVariables,
  EditItem,
  EditItemGQL,
  EditItemVariables,
  EditItem_editItem_Item as ExistingItem,
} from "campaign/gql";
import { useEffect, useState } from "react";
import {
  DeepMap,
  FieldError,
  SubmitHandler,
  useForm,
  UseFormSetValue,
} from "react-hook-form";

export type FormProps = {
  errors: DeepMap<ItemFormInputs, FieldError>;
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
  const [mutate, { loading }] = useMutation<AddItem, AddItemVariables>(
    AddItemGQL
  );

  const onSubmit: SubmitHandler<ItemFormInputs> = async (data) => {
    await mutate({
      variables: {
        id: campaignId,
        input: {
          name: data.name,
          description: data.description,
          quantity: data.quantity || 1,
          tags: data.tags,
        },
      },
    });
    onSuccessCallback();
  };

  return {
    saveLoading: loading,
    isSaveEnabled,
    formProps,
    saveItem: handleSubmit(onSubmit),
  };
};

export const useEditItem = ({
  existingItem: { name, description, tags, quantity, id },
  onSuccessCallback,
}: {
  existingItem: ExistingItem;
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

  const [mutate, { loading }] = useMutation<EditItem, EditItemVariables>(
    EditItemGQL
  );

  const onSubmit: SubmitHandler<ItemFormInputs> = async (input) => {
    await mutate({
      variables: {
        id,
        input,
      },
    });
    onSuccessCallback();
  };

  return {
    saveLoading: loading,
    isSaveEnabled,
    formProps,
    saveItem: handleSubmit(onSubmit),
  };
};
