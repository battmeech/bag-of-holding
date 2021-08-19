import {
  Avatar,
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import React from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  avatarUrl: string;
  username: string;
};

type SignUpFormProps = {
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (data: Inputs) => void;
};

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit = () => {},
}) => {
  const [session] = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  return (
    <chakra.form mt="8" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="6">
        <FormControl isRequired isInvalid={!!errors.username}>
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

              <Input
                {...register("avatarUrl")}
                defaultValue={session?.user?.image || ""}
              />
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
        <Button colorScheme="teal" type="submit">
          submit
        </Button>
      </VStack>
    </chakra.form>
  );
};
