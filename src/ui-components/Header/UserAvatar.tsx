import {
  Avatar,
  Link,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import NextLink from "next/link";
import { signOut, useSession } from "next-auth/react";

export const UserAvatar = () => {
  const { data } = useSession();

  return (
    <Menu placement="bottom-end">
      <MenuButton>
        <Avatar
          aria-label="user avatar"
          size="sm"
          src={(data?.user as any)?.picture || undefined}
          name={data?.user?.name || undefined}
        />
      </MenuButton>
      <MenuList>
        <Link as={NextLink} href="/campaigns">
          <MenuItem>view campaigns</MenuItem>
        </Link>

        <MenuGroup title="profile">
          <Link as={NextLink} href="/profile">
            <MenuItem>my profile</MenuItem>
          </Link>

          <MenuItem onClick={() => signOut({ callbackUrl: "/" })}>
            sign out
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};
