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
import { useMediaQuery } from "@mantine/hooks";
import { BackBtn } from "@/components/ui/BackBtn";

function Page() {
  const blogs = [];
  const mobileMatches = useMediaQuery("(max-width: 768px)");

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
      <Box
        style={{
          paddingLeft: mobileMatches ? "15px" : "52px",
          paddingRight: mobileMatches ? "15px" : "52px",
        }}
        pt="md"
      >
        <Group justify="space-between">
          <Group align="center">
            <BackBtn type="icon" />
            <Text style={{ fontSize: mobileMatches ? 18 : 42 }}>
              Blog Articles
            </Text>
          </Group>

          <SocialMedia />
        </Group>
        <Divider
          pb={mobileMatches ? "sm" : "sm"}
          mt={mobileMatches ? "sm" : "sm"}
        />

        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          {blogs.map((blog) => (
            <Card
              style={{ paddingLeft: "0px" }}
              key={blog?.slug}
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
                {/* {blog.categories.map((i) => (
                  <Button
                    key={i.slug}
                    radius="xl"
                    variant="light"
                    color="indigo"
                  >
                    {i.name}
                  </Button>
                ))} */}
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
