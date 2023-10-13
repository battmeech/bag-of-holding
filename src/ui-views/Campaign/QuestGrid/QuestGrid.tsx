import { Quest } from "@ui-views/Campaign/types";
import React, { FC } from "react";
import { Button, Center, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { QuestCard } from "@ui-views/Campaign/QuestCard/QuestCard";
import { Heading } from "@chakra-ui/layout";
import { useModal } from "@ui-components/ModalProvider";
import { AddQuestModal } from "@ui-views/Campaign/QuestModal/AddQuestModal";

type QuestGridProps = {
  quests: Quest[];
  campaignId: string;
};

const sortByDate = (a: Quest, b: Quest) => {
  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
};

const partitionQuests = (quests: Quest[]) => {
  const active = quests
    .filter((quest) => quest.status === "ACTIVE")
    .sort(sortByDate);
  const failed = quests
    .filter((quest) => quest.status === "FAILED")
    .sort(sortByDate);
  const complete = quests
    .filter((quest) => quest.status === "COMPLETE")
    .sort(sortByDate);

  return { active, failed, complete, fullList: quests };
};

export const QuestGrid: FC<QuestGridProps> = ({ quests, campaignId }) => {
  const { complete, active, failed } = partitionQuests(quests);
  const { openModal } = useModal();

  if (quests.length === 0) {
    return (
      <Center w="full" h="50vh">
        <VStack spacing="8">
          <Text>nothing to see here!</Text>
          <Button
            colorScheme="teal"
            onClick={() =>
              openModal(<AddQuestModal campaignId={campaignId} />, "md")
            }
          >
            add a quest
          </Button>
        </VStack>
      </Center>
    );
  }
  return (
    <>
      {active.length > 0 && (
        <>
          <Heading as="h5" size="sm" mb={3}>
            active
          </Heading>
          <SimpleGrid
            mt="4"
            data-testid="active-quest-grid"
            columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
            spacing={4}
            mb={6}
          >
            {active.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </SimpleGrid>
        </>
      )}

      {complete.length > 0 && (
        <>
          <Heading as="h5" size="sm" mb={3} mt={3}>
            complete
          </Heading>
          <SimpleGrid
            mt="4"
            data-testid="complete-quest-grid"
            columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
            spacing={4}
            mb={6}
          >
            {complete.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </SimpleGrid>
        </>
      )}

      {failed.length > 0 && (
        <>
          <Heading as="h5" size="sm" mb={3} mt={3}>
            failed
          </Heading>
          <SimpleGrid
            mt="4"
            data-testid="failed-quest-grid"
            columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
            spacing={4}
            mb={6}
          >
            {failed.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </SimpleGrid>
        </>
      )}
    </>
  );
};
