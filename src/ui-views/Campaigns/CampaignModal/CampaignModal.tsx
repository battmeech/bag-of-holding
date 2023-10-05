import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import React from "react";
import { useCreateCampaign } from "./useCreateCampaign";
import { useModal } from "@ui-components/ModalProvider";

export function CampaignModal() {
  const { closeModal } = useModal();

  const onSuccessCallback = () => {
    closeModal();
  };

  const { campaignName, createCampaign, setCampaignName, isSavedEnabled } =
    useCreateCampaign({ onSuccessCallback });

  return (
    <>
      <ModalHeader>new campaign</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl isRequired>
          <FormLabel>campaign name</FormLabel>
          <Input
            placeholder="campaign name"
            my="auto"
            value={campaignName}
            onChange={(event) => setCampaignName(event.target.value)}
          />
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={closeModal}>
          close
        </Button>
        <Button
          disabled={!isSavedEnabled}
          onClick={createCampaign}
          colorScheme="teal"
        >
          create campaign
        </Button>
      </ModalFooter>
    </>
  );
}
