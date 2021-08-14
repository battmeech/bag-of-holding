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

type Item = {
  name: string;
  description?: string;
  quantity?: number;
  tags?: string[];
};

export type FormProps = {
  errors: Map<keyof Item, boolean>;
  // eslint-disable-next-line no-unused-vars
  setValues: (value: {
    key: keyof Item;
    value: string | number | string[];
  }) => void;
  values: Item;
};

const validate = (
  errors: Map<keyof Item, boolean>,
  key: keyof Item,
  value: string | number | string[]
) => {
  if (key === "description" || key === "quantity") return errors;
  if (
    (key === "name" && !value) ||
    (key === "name" && !(value as string).trim())
  )
    errors.set(key, true);
  else if (key === "name" && value) errors.delete(key);
  return errors;
};

const initialiseValues = (startValues?: Item): Item => {
  if (!startValues)
    return { name: "", description: undefined, quantity: 1, tags: [] };
  else return { description: undefined, quantity: 1, ...startValues };
};

const useItem = (startingValues?: Item) => {
  const [item, setItem] = useState<Item>(initialiseValues(startingValues));
  const [errors, setErrors] = useState(new Map<keyof Item, boolean>());
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  const resetForm = () => {
    setItem({ name: "", description: undefined, quantity: 1, tags: [] });
    setErrors(new Map<keyof Item, boolean>());
    setIsSaveEnabled(false);
  };

  const setValues = ({
    key,
    value,
  }: {
    key: keyof Item;
    value: string | number | string[];
  }) => {
    setItem((currentState) => ({
      ...currentState,
      [key]: value,
    }));

    setErrors(validate(errors, key, value));
  };

  useEffect(() => {
    if (errors.size > 0) setIsSaveEnabled(false);
    else if (!item.name) setIsSaveEnabled(false);
    else setIsSaveEnabled(true);
  }, [item, errors]);

  const formProps: FormProps = {
    errors,
    setValues,
    values: item,
  };

  return {
    resetForm,
    isSaveEnabled,
    formProps,
  };
};

export const useCreateItem = ({
  campaignId,
  onSuccessCallback,
}: {
  campaignId: string;
  onSuccessCallback: () => void;
}) => {
  const { isSaveEnabled, resetForm, formProps } = useItem();
  const [mutate, { loading }] = useMutation<AddItem, AddItemVariables>(
    AddItemGQL
  );

  const saveItem = async () => {
    await mutate({
      variables: {
        id: campaignId,
        input: {
          name: formProps.values.name,
          description: formProps.values.description,
          quantity: formProps.values.quantity || 1,
          tags: formProps.values.tags,
        },
      },
    });
    onSuccessCallback();
    resetForm();
  };

  return {
    saveLoading: loading,
    resetForm,
    isSaveEnabled,
    formProps,
    saveItem,
  };
};

export const useEditItem = ({
  existingItem,
  onSuccessCallback,
}: {
  existingItem: ExistingItem;
  onSuccessCallback: () => void;
}) => {
  const { isSaveEnabled, resetForm, formProps } = useItem({
    name: existingItem.name,
    description: existingItem.description
      ? existingItem.description
      : undefined,
    quantity: existingItem.quantity,
    tags: existingItem.tags,
  });
  const [mutate, { loading }] = useMutation<EditItem, EditItemVariables>(
    EditItemGQL
  );

  const saveItem = async () => {
    await mutate({
      variables: {
        id: existingItem.id,
        input: {
          name:
            formProps.values.name !== existingItem.name
              ? formProps.values.name
              : undefined,
          description: formProps.values.description,
          quantity: formProps.values.quantity,
          tags: formProps.values.tags,
        },
      },
    });
    onSuccessCallback();
    resetForm();
  };

  return {
    saveLoading: loading,
    resetForm,
    isSaveEnabled,
    formProps,
    saveItem,
  };
};
