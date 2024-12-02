import React from "react";
import {
  IconBrandX,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";

import { Group, ActionIcon, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

function SocialMedia() {
  const mobileMatches = useMediaQuery("(max-width: 768px)");
  return (
    <div>
      <Group gap="xs" wrap="nowrap">
        <ActionIcon
          size={mobileMatches ? "lg" : "xl"}
          variant="default"
          radius="xl"
        >
          <IconBrandX
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        </ActionIcon>
        <ActionIcon
          size={mobileMatches ? "lg" : "xl"}
          variant="default"
          radius="xl"
        >
          <IconBrandLinkedin
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        </ActionIcon>
        <ActionIcon
          size={mobileMatches ? "lg" : "xl"}
          variant="default"
          radius="xl"
        >
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
