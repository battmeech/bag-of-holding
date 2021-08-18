import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { signIn, signOut } from "next-auth/client";
import React from "react";
import { WithMaybeSession } from "types";

export const UserAvatar: React.FC<WithMaybeSession> = ({ session }) => {
  return (
    <Menu>
      <MenuButton>
        <Avatar size="sm" src={session?.user?.image} />
      </MenuButton>
      <MenuList>
        {session?.user ? (
          <MenuItem onClick={() => signOut({ callbackUrl: "/" })}>
            sign out
          </MenuItem>
        ) : (
          <MenuItem onClick={() => signIn()}>sign in</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};
