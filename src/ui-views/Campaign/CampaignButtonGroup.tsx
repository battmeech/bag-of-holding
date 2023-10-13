"use client";
import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaJournalWhills, FaPiggyBank } from "react-icons/fa";
import { CampaignLogModal } from "@ui-views/Campaign/CampaignLogModal";
import { MoneyModal } from "@ui-components/MoneyModal/MoneyModal";
import { AddIcon } from "@chakra-ui/icons";
import { AddItemModal } from "@ui-views/Campaign/ItemModal/AddItemModal";
import React, { FC, ReactNode } from "react";
import { useModal } from "@ui-components/ModalProvider";
import { GoKebabHorizontal } from "react-icons/go";
import { BiSolidGridAlt } from "react-icons/bi";
import {
  useViewProvider,
  View,
} from "@ui-views/Campaign/ViewControls/ViewProvider";
import { ViewChangeModal } from "@ui-views/Campaign/ViewControls/ViewChangeModal";
import { AddQuestModal } from "@ui-views/Campaign/QuestModal/AddQuestModal";

type ButtonsProps = {
  campaignId: string;
};

export const CampaignButtonGroup: FC<ButtonsProps> = ({ campaignId }) => {
  const { openModal } = useModal();

  const variant = useBreakpointValue(
    { base: "kebab", sm: "separate buttons" },
    { fallback: "md", ssr: false }
  );

  const { view, changeView } = useViewProvider();

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

  if (variant === "kebab")
    return (
      <Menu placement="bottom-end">
        <MenuButton>
          <Tooltip label="campaign actions">
            <IconButton
              variant="ghost"
              aria-label={"campaign actions"}
              icon={<GoKebabHorizontal />}
            />
          </Tooltip>
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => openModal(<MoneyModal campaignId={campaignId} />)}
          >
            adjust money
          </MenuItem>

          {contextualMenuItem[view]}

          <MenuItem
            isDisabled={view === "item"}
            onClick={() => changeView("item")}
          >
            view items
          </MenuItem>
          <MenuItem
            isDisabled={view === "quest"}
            onClick={() => changeView("quest")}
          >
            view quests
          </MenuItem>
        </MenuList>
      </Menu>
    );

  return (
    <HStack>
      <Tooltip label="open campaign logs">
        <IconButton
          aria-label="open campaign logs"
          variant="ghost"
          icon={<FaJournalWhills />}
          onClick={() =>
            openModal(<CampaignLogModal campaignId={campaignId} />, "full")
          }
        />
      </Tooltip>

      <Tooltip label="modify money">
        <IconButton
          aria-label="edit money"
          variant="ghost"
          size="lg"
          icon={<FaPiggyBank />}
          onClick={() => openModal(<MoneyModal campaignId={campaignId} />)}
        />
      </Tooltip>
      {contextualAddButton[view]}

      <Tooltip label="toggle view">
        <IconButton
          aria-label="toggle view"
          variant="ghost"
          size="lg"
          icon={<BiSolidGridAlt />}
          onClick={() =>
            openModal(
              <ViewChangeModal view={view} changeView={changeView} />,
              "sm"
            )
          }
        />
      </Tooltip>
    </HStack>
  );
};
