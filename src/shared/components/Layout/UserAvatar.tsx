import {
  Avatar,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { signOut } from "next-auth/client";
import NextLink from "next/link";
import React from "react";
import { useSession } from "shared/session";

export const UserAvatar = () => {
  const { session } = useSession();

  return (
    <Menu placement="bottom-end">
      <MenuButton>
        <Avatar
          size="sm"
          src={session?.user?.image || undefined}
          name={session?.user?.name || undefined}
        />
      </MenuButton>
      <MenuList>
        <Link as={NextLink} href="/campaigns">
          <MenuItem>view campaigns</MenuItem>
        </Link>

        <Link as={NextLink} href="/profile">
          <MenuItem>profile</MenuItem>
        </Link>

        <MenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
