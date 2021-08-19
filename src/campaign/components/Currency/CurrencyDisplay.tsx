import { HStack, IconButton, Tooltip } from "@chakra-ui/react";
import React from "react";
import { FaPiggyBank } from "react-icons/fa";
import { useModal } from "shared";
import { MoneyModal } from "../MoneyModal";
import { Currency } from "./Currency";

type CurrencyDisplayProps = {
  platinum: number;
  gold: number;
  electrum: number;
  silver: number;
  copper: number;
  campaignId: string;
};

export const CurrencyDisplay = ({
  platinum,
  gold,
  electrum,
  silver,
  copper,
  campaignId,
}: CurrencyDisplayProps) => {
  const { openModal } = useModal();

  return (
    <HStack>
      <HStack>
        <Currency denomination="platinum" value={platinum} />
        <Currency denomination="gold" value={gold} />
        <Currency denomination="electrum" value={electrum} />
        <Currency denomination="silver" value={silver} />
        <Currency denomination="copper" value={copper} />
      </HStack>

      <Tooltip label="modify money">
        <IconButton
          aria-label="edit money"
          variant="ghost"
          size="lg"
          icon={<FaPiggyBank />}
          onClick={() => openModal(<MoneyModal campaignId={campaignId} />)}
        />
      </Tooltip>
    </HStack>
  );
};
