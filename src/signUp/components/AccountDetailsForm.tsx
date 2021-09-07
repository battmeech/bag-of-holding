import { useMutation } from "@apollo/client";
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
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSession } from "shared";
import { EditUser, EditUserGQL, EditUserVariables } from "signUp/gql";

export type AccountDetailsInputs = {
  avatarUrl: string;
  username: string;
};

type AccountDetailsFormProps = {
  isSignUp?: boolean;
  onSuccessCallback: (userId: string) => void;
} & SpaceProps;

export const AccountDetailsForm: React.FC<AccountDetailsFormProps> = ({
  isSignUp,
  onSuccessCallback,
  ...spaceProps
}) => {
  const { session } = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
    watch,
  } = useForm<AccountDetailsInputs>();

  const toast = useToast({
    status: "error",
    description:
      "there was a problem updating your profile. please try again later.",
    variant: "solid",
    isClosable: true,
    position: "bottom",
  });

  useEffect(() => {
    setValue("avatarUrl", session?.user?.image || "");
  }, [setValue, session?.user?.image]);

  useEffect(() => {
    setValue("username", (session as any)?.username || "");
  }, [setValue, session]);

  const [mutate] = useMutation<EditUser, EditUserVariables>(EditUserGQL);

  const onSubmit: SubmitHandler<AccountDetailsInputs> = async (data) => {
    const { data: response } = await mutate({
      variables: {
        input: {
          imageUrl: data.avatarUrl,
          username: data.username,
        },
      },
    });
    if (response?.editUser.__typename === "User") {
      onSuccessCallback(response.editUser.id);
    } else {
      return toast();
    }
  };

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
