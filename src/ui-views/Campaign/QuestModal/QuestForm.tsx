import {
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FormProps } from "@ui-views/Campaign/QuestModal/useQuestForm";
import { QuestStatus } from "@ui-views/Campaign/types";

type QuestFormProps = {
  mode: "create" | "edit";
} & FormProps;

export const QuestForm = ({
  errors,
  values,
  setValue,
  mode,
}: QuestFormProps) => {
  return (
    <VStack spacing="4">
      <FormControl isRequired>
        <FormLabel>quest name</FormLabel>
        <Input
          isInvalid={!!errors.name}
          placeholder="quest name"
          my="auto"
          value={values.name}
          onChange={(event) =>
            setValue("name", event.target.value, { shouldDirty: true })
          }
        />
      </FormControl>

      <FormControl>
        <FormLabel>quest source</FormLabel>
        <Input
          placeholder="where did this quest come from?"
          my="auto"
          value={values.source}
          onChange={(event) =>
            setValue("source", event.target.value, { shouldDirty: true })
          }
        />
      </FormControl>

      {mode === "edit" && (
        <FormControl>
          <FormLabel>quest status</FormLabel>
          <Select
            value={values.status}
            onChange={(event) =>
              setValue("status", event.target.value as QuestStatus, {
                shouldDirty: true,
              })
            }
          >
            <option value={"ACTIVE" as QuestStatus}>active</option>
            <option value={"COMPLETE" as QuestStatus}>complete</option>
            <option value={"FAILED" as QuestStatus}>failed</option>
          </Select>
        </FormControl>
      )}
    </VStack>
  );
};
