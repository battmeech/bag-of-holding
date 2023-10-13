import { Quest } from "@ui-views/Campaign/types";
import React, { FC } from "react";
import {
  Divider,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { GoKebabHorizontal } from "react-icons/go";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useModal } from "@ui-components/ModalProvider";
import { EditQuestModal } from "@ui-views/Campaign/QuestModal/EditQuestModal";
import { DeleteConfirmationModal } from "@ui-views/Campaign/QuestCard/DeleteConfirmation";
import { FaExpandAlt } from "react-icons/fa";
import { QuestNotes } from "@ui-views/Campaign/QuestCard/QuestNotes";

type QuestCardProps = {
  quest: Quest;
};

export const QuestCard: FC<QuestCardProps> = ({ quest }) => {
  const { openModal } = useModal();

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
          <HStack>
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
                  onClick={() =>
                    openModal(<EditQuestModal quest={quest} />, "md")
                  }
                >
                  edit quest
                </MenuItem>
                <MenuItem
                  icon={<DeleteIcon />}
                  onClick={() =>
                    openModal(
                      <DeleteConfirmationModal
                        questId={quest.id}
                        campaignId={quest.campaignId}
                      />
                    )
                  }
                >
                  delete quest
                </MenuItem>
              </MenuList>
            </Menu>

            <Tooltip label="view notes">
              <IconButton
                variant="ghost"
                aria-label="view notes"
                size="xs"
                icon={<FaExpandAlt />}
                onClick={() => openModal(<QuestNotes quest={quest} />, "2xl")}
              />
            </Tooltip>
          </HStack>
        </HStack>

        <Divider />

        <Text w="full" fontSize="sm">
          source: {quest.source || "not specified"}
        </Text>
      </VStack>
    </VStack>
  );
};
