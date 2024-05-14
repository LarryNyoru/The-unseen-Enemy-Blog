import React from "react";
import {
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";

import { Group, ActionIcon, rem } from "@mantine/core";

function SocialMedia() {
  return (
    <div>
      <Group gap="xs" wrap="nowrap">
        <ActionIcon size="xl" variant="default" radius="xl">
          <IconBrandTwitter
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        </ActionIcon>
        <ActionIcon size="xl" variant="default" radius="xl">
          <IconBrandLinkedin
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        </ActionIcon>
        <ActionIcon size="xl" variant="default" radius="xl">
          <IconBrandInstagram
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        </ActionIcon>
      </Group>
    </div>
  );
}

export default SocialMedia;
