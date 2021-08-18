import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { signIn, signOut } from "next-auth/client";
import React from "react";
import { useSession } from "shared/session";

export const UserAvatar = () => {
  const { session } = useSession();

  return (
    <Menu>
      <MenuButton>
        <Avatar size="sm" src={session?.user?.image || undefined} />
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
