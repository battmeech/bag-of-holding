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
import React, { FC } from "react";
import { useModal } from "@ui-components/ModalProvider";
import { GoKebabHorizontal } from "react-icons/go";

type ButtonsProps = {
  campaignId: string;
};

export const CampaignButtonGroup: FC<ButtonsProps> = ({ campaignId }) => {
  const { openModal } = useModal();

  const variant = useBreakpointValue(
    { base: "kebab", sm: "separate buttons" },
    { fallback: "md", ssr: false }
  );

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

          <MenuItem
            onClick={() => openModal(<AddItemModal campaignId={campaignId} />)}
          >
            add item
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
      <Tooltip label="add item">
        <IconButton
          aria-label="add item"
          variant="ghost"
          size="lg"
          icon={<AddIcon />}
          onClick={() => openModal(<AddItemModal campaignId={campaignId} />)}
        />
      </Tooltip>
    </HStack>
  );
};
