"use client";
import Hero from "@/components/hero/Hero";
import { getCategoryPost } from "@/services";
import { GraphQLData } from "@/types";
import {
  Title,
  Box,
  Divider,
  SimpleGrid,
  Card,
  Button,
  AspectRatio,
  Text,
  Group,
  Image,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

import classes from "./page.module.css";
import SocialMedia from "@/components/socialMedia/SocialMedia";

function Page({ params }: { params: { slug: string } }) {
  const { data } = useQuery<GraphQLData[]>({
    queryKey: ["data"],
    queryFn: () => getCategoryPost(params.slug),
  });

  const blogs = [];
  if (Array.isArray(data)) {
    for (const blogData of data) {
      const d = blogData.node;
      blogs.push(d);
    }
  }
  console.log("data", data);
  //   console.log("category", category);
  return (
    <div>
      <Hero />
      <Box style={{ paddingLeft: "62px", paddingRight: "62px" }}>
        <Group justify="space-between">
          <Text pt="md" style={{ fontSize: 42 }}>
            {params.slug}
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
              href={`/blog/${encodeURIComponent(blog?.slug)}`}
              className={classes.card}
            >
              <AspectRatio key={blog.slug} ratio={1920 / 1080}>
                <Image key={blog.slug} src={blog?.featuredImage?.url} />
              </AspectRatio>
              <Group justify="space-between" pt="sm">
                {" "}
                <Text size="xl" className={classes.title} fw={500}>
                  {blog?.title}
                </Text>
                {blog?.categories?.map((i) => (
                  <Button
                    key={i.slug}
                    radius="xl"
                    variant="light"
                    color="indigo"
                  >
                    {i?.name}
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
