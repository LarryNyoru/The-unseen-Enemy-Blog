"use client";
import React from "react";
import Hero from "@/components/hero/Hero";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/services";
import { GraphQLData } from "@/types";
import {
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
  Box,
  Group,
  ActionIcon,
  Divider,
  rem,
  Button,
} from "@mantine/core";

import Link from "next/link";

import SocialMedia from "@/components/socialMedia/SocialMedia";
import classes from "./page.module.css";

function Page() {
  const blogs = [];

  const { data: posts } = useQuery<GraphQLData[]>({
    queryKey: ["blogs"],
    queryFn: async () => await getPosts(),
  });

  if (Array.isArray(posts)) {
    for (const blogData of posts) {
      const d = blogData.node;
      blogs.push(d);
    }
  }

  return (
    <div>
      <Hero />
      <Box style={{ paddingLeft: "62px", paddingRight: "62px" }}>
        <Group justify="space-between">
          <Text pt="md" style={{ fontSize: 42 }}>
            Blog Articles
          </Text>
          <SocialMedia />
        </Group>
        <Divider pb="md" />

        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          {blogs.map((blog) => (
            <Card
              key={blog?.slug}
              p="md"
              radius="md"
              component={Link}
              href={`/blog/${encodeURIComponent(blog.slug)}`}
              className={classes.card}
            >
              <AspectRatio ratio={1920 / 1080}>
                <Image
                  key={blog.slug}
                  src={blog?.featuredImage?.url}
                  alt="IMG"
                />
              </AspectRatio>
              <Group justify="space-between" pt="sm">
                {" "}
                <Text size="xl" className={classes.title} fw={500}>
                  {blog.title}
                </Text>
                {blog.categories.map((i) => (
                  <Button
                    key={i.slug}
                    radius="xl"
                    variant="light"
                    color="indigo"
                  >
                    {i.name}
                  </Button>
                ))}
              </Group>

              <Text c="dimmed" size="xs" fw={700} mt="md">
                {blog?.excerpt}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </div>
  );
}

export default Page;
