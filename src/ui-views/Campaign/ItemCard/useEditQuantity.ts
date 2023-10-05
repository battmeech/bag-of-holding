import { useState } from "react";

export const useEditQuantity = ({
  currentQuantity,
  itemId,
}: {
  itemId: string;
  currentQuantity: number;
}) => {
  const [quantity, setQuantity] = useState(currentQuantity);

  const saveItem = async (newQuantity: number) => {
    alert(`TODO: save quantity ${itemId} ${newQuantity}`);
  };

  return {
    quantity,
    setQuantity,
    saveItem,
  };
};
