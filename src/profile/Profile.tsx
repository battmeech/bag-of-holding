import { Container, useToast } from "@chakra-ui/react";
import { request } from "graphql-request";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { PageHeading } from "shared/components/PageHeading";
import {
  AccountDetailsForm,
  AccountDetailsInputs,
} from "signUp/components/AccountDetailsForm";
import { editUserMutation } from "signUp/gql/editUserMutation";
import { EditUser, EditUserVariables } from "signUp/__generated__/EditUser";
import { WithSession } from "types";

export const Profile: React.FC<WithSession> = () => {
  const toast = useToast({
    status: "error",
    description:
      "there was a problem updating your profile. please try again later.",
    variant: "solid",
    isClosable: true,
    position: "bottom",
  });

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
      return toast({
        status: "success",
        description: "profile updated.",
      });
    } else {
      return toast();
    }
  };
  return (
    <>
      <PageHeading>my profile</PageHeading>
      <Container>
        <AccountDetailsForm onSubmit={onSubmit} mt="8" />
      </Container>
    </>
  );
};
