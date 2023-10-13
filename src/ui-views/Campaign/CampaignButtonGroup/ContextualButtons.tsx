import {
  useViewProvider,
  View,
} from "@ui-views/Campaign/ViewControls/ViewProvider";
import React, { FC, ReactNode } from "react";
import { IconButton, MenuItem, Tooltip } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { AddItemModal } from "@ui-views/Campaign/ItemModal/AddItemModal";
import { AddQuestModal } from "@ui-views/Campaign/QuestModal/AddQuestModal";
import { useModal } from "@ui-components/ModalProvider";
import { HiSwitchHorizontal } from "react-icons/hi";

type ContextualButtonProps = {
  campaignId: string;
};

export const ContextualAddButton: FC<ContextualButtonProps> = ({
  campaignId,
}) => {
  const { openModal } = useModal();
  const { view } = useViewProvider();

  const contextualAddButton: Record<View, ReactNode> = {
    item: (
      <Tooltip label="add item">
        <IconButton
          aria-label="add item"
          variant="ghost"
          size="lg"
          icon={<AddIcon />}
          onClick={() =>
            openModal(<AddItemModal campaignId={campaignId} />, "md")
          }
        />
      </Tooltip>
    ),
    quest: (
      <Tooltip label="add quest">
        <IconButton
          aria-label="add quest"
          variant="ghost"
          size="lg"
          icon={<AddIcon />}
          onClick={() =>
            openModal(<AddQuestModal campaignId={campaignId} />, "md")
          }
        />
      </Tooltip>
    ),
  };

  return contextualAddButton[view];
};

export const ContextualMenuButton: FC<ContextualButtonProps> = ({
  campaignId,
}) => {
  const { openModal } = useModal();
  const { view } = useViewProvider();

  const contextualMenuItem: Record<View, ReactNode> = {
    item: (
      <MenuItem
        onClick={() => openModal(<AddItemModal campaignId={campaignId} />)}
      >
        add item
      </MenuItem>
    ),
    quest: (
      <MenuItem
        onClick={() => openModal(<AddQuestModal campaignId={campaignId} />)}
      >
        add quest
      </MenuItem>
    ),
  };

  return contextualMenuItem[view];
};

export const ContextualViewButton: FC = () => {
  const { view, changeView } = useViewProvider();

  const contextualViewButtons: Record<View, ReactNode> = {
    item: (
      <Tooltip label="view quests">
        <IconButton
          aria-label="toggle view"
          variant="ghost"
          size="lg"
          icon={<HiSwitchHorizontal />}
          onClick={() => changeView("quest")}
        />
      </Tooltip>
    ),
    quest: (
      <Tooltip label="view items">
        <IconButton
          aria-label="toggle view"
          variant="ghost"
          size="lg"
          icon={<HiSwitchHorizontal />}
          onClick={() => changeView("item")}
        />
      </Tooltip>
    ),
  };

  return contextualViewButtons[view];
};
