import { trpc } from "@trpc-client/client";
import { FC } from "react";
import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { useModal } from "@ui-components/ModalProvider";
import { LogTable } from "@ui-views/Campaign/CampaignLogs/LogTable";

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
        {data === undefined ? "loading" : <LogTable logs={data} />}
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={closeModal}>
          close
        </Button>
      </ModalFooter>
    </>
  );
};
