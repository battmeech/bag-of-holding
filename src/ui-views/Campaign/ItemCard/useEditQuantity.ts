import { useState } from "react";
import { trpc } from "@trpc-client/client";

export const useEditQuantity = ({
  currentQuantity,
  itemId,
  campaignId,
}: {
  itemId: string;
  campaignId: string;
  currentQuantity: number;
}) => {
  const [quantity, setQuantity] = useState(currentQuantity);

  const trpcContext = trpc.useContext();
  const mutation = trpc.item.update.useMutation({
    onSuccess: () => {
      trpcContext.campaign.getById.invalidate({ id: campaignId });
    },
  });

  const saveItem = async (newQuantity: number) => {
    mutation.mutate({ itemId, quantity: newQuantity });
  };

  return {
    quantity,
    setQuantity,
    saveItem,
  };
};
