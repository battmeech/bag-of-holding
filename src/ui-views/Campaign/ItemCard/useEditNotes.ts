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

  const saveItem = async () => {
    alert(`TODO: save notes ${itemId}`);

    setSaveActive(false);
  };

  return {
    notes,
    saveActive,
    setNotes,
    saveItem,
  };
};
