import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { signOut } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import { useSession } from "shared/session";

export const UserAvatar = () => {
  const { session } = useSession();
  const router = useRouter();

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
        <MenuItem onClick={() => router.push("/campaigns")}>
          view campaigns
        </MenuItem>

        <MenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
