import { Quest } from "@ui-views/Campaign/types";
import React, { FC } from "react";
import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GoKebabHorizontal } from "react-icons/go";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useModal } from "@ui-components/ModalProvider";

type QuestCardProps = {
  quest: Quest;
};

export const QuestCard: FC<QuestCardProps> = ({ quest }) => {
  return (
    <VStack
      justify="space-between"
      p="4"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <VStack w="full">
        <HStack w="full" justify="space-between">
          <Text fontSize="md">{quest.name}</Text>
          <Menu placement="bottom-end">
            <MenuButton
              as={IconButton}
              aria-label="quest options"
              icon={<GoKebabHorizontal />}
              variant="ghost"
              size="xs"
            />
            <MenuList>
              <MenuItem
                icon={<EditIcon />}
                onClick={() => alert("TODO: quest modal")}
              >
                edit quest
              </MenuItem>
              <MenuItem
                icon={<DeleteIcon />}
                onClick={() => alert('TODO": delete confirmation modal')}
              >
                delete quest
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </VStack>
    </VStack>
  );
};