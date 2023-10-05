import { useEffect, useState } from "react";
import { trpc } from "@trpc-client/client";
import { Item } from "@ui-views/Campaign/types";

export const useEditNotes = ({ item }: { item: Item }) => {
  const [notes, setNotes] = useState(item.notes);
  const [saveActive, setSaveActive] = useState(false);

  const trpcContext = trpc.useContext();
  const mutation = trpc.item.update.useMutation({
    onSuccess: () => {
      trpcContext.campaign.getById.invalidate({ id: item.campaignId });
    },
  });

  useEffect(() => {
    setSaveActive(notes !== item.notes);
  }, [notes, item.notes]);

  const saveItem = async () => {
    mutation.mutate({ itemId: item.id, notes: notes || undefined });
    setSaveActive(false);
  };

  return {
    notes,
    saveActive,
    setNotes,
    saveItem,
  };
};
