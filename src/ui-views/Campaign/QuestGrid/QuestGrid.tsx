import { Quest } from "@ui-views/Campaign/types";
import { FC } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { QuestCard } from "@ui-views/Campaign/QuestCard/QuestCard";
import { Heading } from "@chakra-ui/layout";

type QuestGridProps = {
  quests: Quest[];
  campaignId: string;
};

const partitionQuests = (quests: Quest[]) => {
  const active = quests.filter((quest) => quest.status === "ACTIVE");
  const failed = quests.filter((quest) => quest.status === "FAILED");
  const complete = quests.filter((quest) => quest.status === "COMPLETE");

  return { active, failed, complete, fullList: quests };
};

export const QuestGrid: FC<QuestGridProps> = ({ quests }) => {
  const { complete, active, failed } = partitionQuests(quests);

  if (quests.length === 0) {
    return <div>no quests</div>;
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
