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
import React, { FC } from "react";
import { useModal } from "@ui-components/ModalProvider";
import { GoKebabHorizontal } from "react-icons/go";
import { BiSolidGridAlt } from "react-icons/bi";
import { useViewProvider } from "@ui-views/Campaign/ViewControls/ViewProvider";
import { ViewChangeModal } from "@ui-views/Campaign/ViewControls/ViewChangeModal";
import {
  ContextualAddButton,
  ContextualMenuButton,
} from "@ui-views/Campaign/CampaignButtonGroup/ContextualButtons";

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

          <ContextualMenuButton campaignId={campaignId} />

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

      <ContextualAddButton campaignId={campaignId} />

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
