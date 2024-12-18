"use client";

import React from "react";
import {
  Button,
  Title,
  Text,
  Paper,
  Box,
  Grid,
  Group,
  Stack,
  Divider,
  Blockquote,
} from "@mantine/core";

import { FaQuoteLeft } from "react-icons/fa";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/services";
import { GraphQLData } from "@/types";

import { useMediaQuery } from "@mantine/hooks";

import SocialMedia from "../socialMedia/SocialMedia";
import classes from "./Blog.module.css";

function Blog() {
  const blogs = [];
  const mobileMatches = useMediaQuery("(max-width: 768px)");
  const { data: posts } = useQuery<GraphQLData[]>({
    queryKey: ["blogs"],
    queryFn: getPosts,
  });

  if (Array.isArray(posts)) {
    for (const blogData of posts) {
      const d = blogData.node;
      blogs.push(d);
    }
  }
  const filteredBlog = blogs.filter((blog) => blog.profilePost === true);
  console.log("Blogs", blogs);

  return (
    <Box
      style={{
        paddingLeft: mobileMatches ? "20px" : "62px",
        paddingRight: mobileMatches ? "20px" : "62px",
      }}
    >
      <Group
        justify="space-between"
        wrap="nowrap"
        pt="md"
        pb={mobileMatches ? "md" : "xs"}
      >
        <Text style={{ fontSize: mobileMatches ? 18 : 42 }}>
          Popular Articles
        </Text>
        <SocialMedia />
      </Group>
      <Divider pb="md" />
      <Grid>
        <Grid.Col span={mobileMatches ? 12 : 4}>
          {" "}
          {filteredBlog.length > 0 && (
            <Paper
              shadow="md"
              p="md"
              radius="md"
              className={classes.card}
              style={{
                backgroundImage: `url(${filteredBlog[0]?.featuredImage.url})`,
                width: mobileMatches ? "100%" : "100%",
                // backgroundSize: "cover",
                // backgroundPosition: "center",
              }}
            >
              <div>
                {filteredBlog[0]?.categories.map((i) => (
                  <Text key={i?.slug} className={classes.category} size="xs">
                    {i?.name}
                  </Text>
                ))}
                <Title order={3} className={classes.title}>
                  {filteredBlog[0]?.title}
                </Title>
              </div>
              <Button
                variant="white"
                color="dark"
                component={Link}
                href={`/blog/${encodeURIComponent(filteredBlog[0].slug)}`}
              >
                Read article
              </Button>
            </Paper>
          )}
        </Grid.Col>

        <Grid.Col span={mobileMatches ? 12 : 6}>
          {blogs
            .filter((blog) => blog.profilePost != true)
            .slice(-3)
            .map((blog) => (
              <Grid key={blog.slug} className={classes.blogs}>
                <Grid.Col span={mobileMatches ? 12 : 3}>
                  <Paper
                    shadow="md"
                    p="xl"
                    mb="md"
                    radius="md"
                    className={classes.cardBlogs}
                    style={{
                      backgroundImage: `url(${blog?.featuredImage.url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={mobileMatches ? 12 : 9}>
                  <Paper
                    component={Link}
                    href={`/blog/${encodeURIComponent(blog.slug)}`}
                  >
                    <Stack gap="md">
                      <Group justify="space-between">
                        {" "}
                        <Text size="xl" fw={500} c="black">
                          {blog.title}
                        </Text>
                        {/* {blog.categories.map((i) => (
                          <Button key={i.slug} radius="xl" variant="light">
                            {i.name}
                          </Button>
                        ))} */}
                      </Group>

                      <Text c="dimmed">{blog.excerpt}</Text>
                    </Stack>
                  </Paper>
                </Grid.Col>
              </Grid>
            ))}
        </Grid.Col>
        <Grid.Col span={mobileMatches ? 12 : 2} pl="xl">
          <Stack align="flex-end">
            <Blockquote
              iconSize={41}
              cite="– Dr Kwame Nkrumah"
              icon={<FaQuoteLeft />}
              mt="xs"
            >
              <Text fs="italic">
                {" "}
                It is clear that we must find an African solution to our
                problems, and that this can only be found in African unity.
                Divided we are weak; united, Africa could become one of the
                greatest forces for good in the world.
              </Text>
            </Blockquote>
          </Stack>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default Blog;
