import {
  Avatar,
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  SpaceProps,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export type AccountDetailsInputs = {
  avatarUrl: string;
  username: string;
};

type AccountDetailsFormProps = {
  isSignUp?: boolean;
  onSubmit?: SubmitHandler<AccountDetailsInputs>;
} & SpaceProps;

export const AccountDetailsForm: React.FC<AccountDetailsFormProps> = ({
  onSubmit = () => {},
  isSignUp,
  ...spaceProps
}) => {
  const [session] = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
    watch,
  } = useForm<AccountDetailsInputs>();

  useEffect(() => {
    setValue("avatarUrl", session?.user?.image || "");
  }, [setValue, session?.user?.image]);
  useEffect(() => {
    setValue("username", (session as any)?.username || "");
  }, [setValue, session]);

  return (
    <chakra.form {...spaceProps} onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="6">
        <FormControl isInvalid={!!errors.username}>
          <FormLabel>username</FormLabel>
          <Input
            {...register("username", {
              required: "please choose a username",
            })}
          />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.avatarUrl}>
          <Stack
            spacing="8"
            direction={{ base: "column", md: "row" }}
            align="center"
          >
            <VStack spacing="0" w="full" align="flex-start">
              <FormLabel>avatar url</FormLabel>

              <Input {...register("avatarUrl")} />
              <Tooltip
                label="we don't support image hosting just yet. choose an image from the web and paste the url above!"
                aria-label="image upload tooltip"
              >
                <Text
                  alignSelf="flex-end"
                  pt="2"
                  cursor="help"
                  borderBottom="1px dotted"
                  fontSize="xs"
                >
                  {"where's the upload button?"}
                </Text>
              </Tooltip>
            </VStack>
            <Avatar
              size="2xl"
              src={watch("avatarUrl") || session?.user?.image || ""}
              alt="user avatar"
            />
          </Stack>
          <FormErrorMessage>{errors.avatarUrl?.message}</FormErrorMessage>
        </FormControl>
        <Button
          disabled={!(isSignUp || isDirty)}
          colorScheme="teal"
          type="submit"
        >
          {isSignUp ? "submit" : "save changes"}
        </Button>
      </VStack>
    </chakra.form>
  );
};
