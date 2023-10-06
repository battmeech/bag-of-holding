import { trpc } from "@trpc-client/client";
import { FC } from "react";
import {
  Text,
  Button,
  HStack,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  VStack,
  Avatar,
} from "@chakra-ui/react";
import { useModal } from "@ui-components/ModalProvider";

type CampaignLogProps = {
  campaignId: string;
};

export const CampaignLogModal: FC<CampaignLogProps> = ({ campaignId }) => {
  const { closeModal } = useModal();
  const { data } = trpc.campaignLogs.list.useQuery({ campaignId: campaignId });

  return (
    <>
      <ModalHeader>campaign logs</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        {data === undefined ? (
          "loading"
        ) : (
          <VStack>
            {data.map((log) => (
              <HStack key={log.id} w="full">
                <Avatar
                  aria-label="user avatar"
                  size="sm"
                  src={log.user.image || undefined}
                  name={log.user.name || undefined}
                />

                <Text>{new Date(log.date).toLocaleDateString("en-GB")}</Text>
                <Text>{new Date(log.date).toLocaleTimeString("en-GB")}</Text>
                <Text>{log.change}</Text>
                <Text>{log.description}</Text>
              </HStack>
            ))}
          </VStack>
        )}
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={closeModal}>
          close
        </Button>
      </ModalFooter>
    </>
  );
};
