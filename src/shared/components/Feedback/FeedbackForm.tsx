import fetch from "cross-fetch";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";

type IssueFormInputs = {
  title: string;
  content: string;
};

export type IssueType = "bug" | "feature";

type FeedbackFormProps = {
  issueType: IssueType;
  onSuccess?: () => void;
};

export const FeedbackForm: FC<FeedbackFormProps> = ({
  issueType,
  onSuccess,
}) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IssueFormInputs>();

  const onSubmit: SubmitHandler<IssueFormInputs> = async (data) => {
    const res = await fetch(`/api/issues/${issueType}`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.status === 200 && onSuccess) onSuccess();
  };

  return (
    <chakra.form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="6">
        <FormControl isInvalid={!!errors.title}>
          <FormLabel>title</FormLabel>
          <Input
            placeholder={`${issueType} title`}
            {...register("title", {
              required: "please provide a title",
            })}
          />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.content}>
          <FormLabel>content</FormLabel>
          <Textarea
            placeholder={`provide as much detail as possible about the ${issueType}`}
            resize="none"
            {...register("content", {
              required: `please provide detail about the ${issueType}`,
            })}
          />
          <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
        </FormControl>

        <Button colorScheme="teal" type="submit">
          submit {issueType}
        </Button>
      </VStack>
    </chakra.form>
  );
};
