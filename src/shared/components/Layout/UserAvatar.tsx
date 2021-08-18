import { Avatar, Menu, MenuButton } from "@chakra-ui/react";
import React from "react";
import { WithMaybeSession } from "types";

export const UserAvatar: React.FC<WithMaybeSession> = ({ session }) => {
  return (
    <Menu>
      <MenuButton>
        <Avatar size="sm" src={session?.user.image} />
      </MenuButton>
    </Menu>
  );
};
