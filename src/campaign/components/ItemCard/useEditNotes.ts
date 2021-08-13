import { useMutation } from "@apollo/client";
import { EditItem, EditItemGQL, EditItemVariables } from "campaign/gql";
import { useEffect, useState } from "react";

export const useEditNotes = ({
  currentNotes,
  itemId,
}: {
  currentNotes: string | null;
  itemId: string;
}) => {
  const [notes, setNotes] = useState(currentNotes);
  const [saveActive, setSaveActive] = useState(false);

  useEffect(() => {
    setSaveActive(notes !== currentNotes);
  }, [notes, currentNotes]);

  const [mutate] = useMutation<EditItem, EditItemVariables>(EditItemGQL);

  const saveItem = async () => {
    await mutate({
      variables: {
        id: itemId,
        input: {
          notes,
        },
      },
    });

    setSaveActive(false);
  };

  return {
    notes,
    saveActive,
    setNotes,
    saveItem,
  };
};
