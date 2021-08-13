import { useMutation } from "@apollo/client";
import { EditItem, EditItemGQL, EditItemVariables } from "campaign/gql";
import { useState } from "react";

export const useEditQuantity = ({
  currentQuantity,
  itemId,
}: {
  itemId: string;
  currentQuantity: number;
}) => {
  const [quantity, setQuantity] = useState(currentQuantity);

  const [mutate] = useMutation<EditItem, EditItemVariables>(EditItemGQL);

  const saveItem = async (newQuantity: number) => {
    await mutate({
      variables: {
        id: itemId,
        input: {
          quantity: newQuantity,
        },
      },
    });
  };

  return {
    quantity,
    setQuantity,
    saveItem,
  };
};
