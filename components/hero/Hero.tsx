"use client";
import React from "react";

import cx from "clsx";
import {
  Title,
  Text,
  Button,
  Overlay,
  TextInput,
  rem,
  Group,
  Menu,
  Grid,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import classes from "./Hero.module.css";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services";
import { Categories } from "@/types";
import { useMediaQuery } from "@mantine/hooks";

function Hero() {
  const { data: categories } = useQuery<Categories[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const mobileMatches = useMediaQuery("(max-width: 768px)");

  console.log("Categories", categories);
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Group justify="space-between">
          <>
            <Title className={classes.title}>
              The Unseen{" "}
              <Text component="span" inherit className={classes.highlight}>
                Enemy Blog
              </Text>
            </Title>
          </>
          <Group style={{ paddingRight: "62px" }}>
            <Text component={Link} href="/" c="white" fw={800}>
              Home
            </Text>
            <Text component={Link} href="/blogs" c="white" fw={800}>
              Blogs
            </Text>
            <Menu withArrow trigger="click-hover">
              <Menu.Target>
                <Group>
                  <Text c="white" fw={800}>
                    Categories
                  </Text>
                </Group>
              </Menu.Target>
              <Menu.Dropdown>
                {categories?.map((c) => (
                  <Menu.Item
                    key={c.slug}
                    component={Link}
                    href={`/categories/${encodeURIComponent(c.slug)}`}
                  >
                    {c.name}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
        <div className={classes.controls}>
          {/* <TextInput
            radius="xl"
            size="md"
            placeholder="Search questions"
            rightSectionWidth={42}
            leftSection={
              <IconSearch
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            }
          />
          <Button
            radius="xl"
            ml="lg"
            className={cx(classes.control, classes.secondaryControl)}
            size="lg"
          >
            Search
          </Button> */}
          <Grid>
            <Grid.Col span={mobileMatches ? 12 : 6}>
              <Text c="white" fs="italic" fz="lg">
                Journey into Africa`&apos;`s unseen battles with The Unseen
                Enemy Blog. Discover the quiet wars of geopolitics and climate
                change shaping the continent`&apos;`s fate.
              </Text>
            </Grid.Col>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Hero;
