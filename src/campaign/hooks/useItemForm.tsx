import { useMutation } from "@apollo/client";
import { AddItem, AddItemGQL, AddItemVariables } from "campaign/gql";
import { useEffect, useState } from "react";

type Item = {
  name: string;
  description?: string;
};

const validate = (
  errors: Map<keyof Item, boolean>,
  key: keyof Item,
  value: string
) => {
  if (key === "description") return errors;
  if (key === "name" && !value) errors.set(key, true);
  else if (key === "name" && value) errors.delete(key);
  return errors;
};

export const useItemForm = ({
  campaignId,
  onSuccessCallback,
}: {
  campaignId: string;
  onSuccessCallback: () => void;
}) => {
  const [item, setItem] = useState<Item>({ name: "", description: undefined });
  const [errors, setErrors] = useState(new Map<keyof Item, boolean>());
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  const [mutate, { loading }] = useMutation<AddItem, AddItemVariables>(
    AddItemGQL
  );

  const resetForm = () => {
    setItem({ name: "", description: undefined });
    setErrors(new Map<keyof Item, boolean>());
    setIsSaveEnabled(false);
  };

  const setValues = ({ key, value }: { key: keyof Item; value: string }) => {
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

  const saveItem = async () => {
    await mutate({
      variables: {
        id: campaignId,
        input: { name: item.name, description: item.description },
      },
    });
    onSuccessCallback();
    resetForm();
  };

  return {
    saveLoading: loading,
    resetForm,
    isSaveEnabled,
    values: item,
    setValues,
    saveItem,
    errors,
  };
};
