import { Container, Heading, useToast } from "@chakra-ui/react";
import request from "graphql-request";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { PageHeading } from "shared/components/PageHeading";
import {
  AccountDetailsForm,
  AccountDetailsInputs,
} from "./components/AccountDetailsForm";
import { editUserMutation } from "./gql/editUserMutation";
import { EditUser, EditUserVariables } from "./__generated__/EditUser";

export const SignUp: React.FC = () => {
  const toast = useToast({
    status: "error",
    description:
      "there was a problem updating your profile. please try again later.",
    variant: "solid",
    isClosable: true,
    position: "bottom",
  });

  const [session] = useSession();
  const router = useRouter();

  const onSubmit: SubmitHandler<AccountDetailsInputs> = async (data) => {
    const res = await request<EditUser, EditUserVariables>(
      "/api/graphql",
      editUserMutation,
      {
        input: {
          imageUrl: data.avatarUrl,
          username: data.username,
        },
      }
    );
    if (res.editUser.__typename === "User") {
      return router.push((router.query.callbackUrl as string) || "/campaigns");
    } else {
      return toast();
    }
  };

  return (
    <>
      <PageHeading>welcome, {session?.user?.name || "adventurer"}</PageHeading>
      <Heading mt="2" size="sm">
        we just need a few more things to get you set up...
      </Heading>
      <Container>
        <AccountDetailsForm mt="8" onSubmit={onSubmit} isSignUp />
      </Container>
    </>
  );
};
