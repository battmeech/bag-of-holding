import {
  Avatar,
  Link,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { signOut } from "next-auth/client";
import NextLink from "next/link";
import React from "react";
import { useSession } from "shared";
import { FeedbackForm } from "../Feedback/FeedbackForm";
import { useModal } from "../ModalProvider";

export const UserAvatar = () => {
  const { session } = useSession();

  const { openModal, closeModal } = useModal();

  return (
    <Menu placement="bottom-end">
      <MenuButton>
        <Avatar
          aria-label="user avatar"
          size="sm"
          src={session?.user?.image || undefined}
          name={session?.user?.name || undefined}
        />
      </MenuButton>
      <MenuList>
        <Link as={NextLink} href="/campaigns">
          <MenuItem>view campaigns</MenuItem>
        </Link>

        <MenuGroup title="issues">
          <MenuItem
            onClick={() =>
              openModal(
                <FeedbackForm issueType="bug" onSuccess={closeModal} />,
                "xl"
              )
            }
          >
            report a bug
          </MenuItem>

          <MenuItem
            onClick={() =>
              openModal(
                <FeedbackForm issueType="feature" onSuccess={closeModal} />,
                "xl"
              )
            }
          >
            suggest a feature
          </MenuItem>
        </MenuGroup>

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
