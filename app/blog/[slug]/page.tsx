"use client";
import { getComments, getPostDetails, submitComment } from "@/services";
import { IComments, IPostComments, specificBlog } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Text,
  Box,
  rem,
  Group,
  ActionIcon,
  Divider,
  TypographyStylesProvider,
  Grid,
  Stack,
  Paper,
  Title,
  TextInput,
  Textarea,
  Button,
  Avatar,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import Hero from "@/components/hero/Hero";
import SocialMedia from "@/components/socialMedia/SocialMedia";
import { useForm } from "@mantine/form";
import { postComments } from "@/hooks/postComments";
import { useMediaQuery } from "@mantine/hooks";

import classes from "./page.module.css";
import { BackBtn } from "@/components/ui/BackBtn";

function Page({ params }: { params: { slug: string } }) {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const mobileMatches = useMediaQuery("(max-width: 768px)");

  const { data: blog } = useQuery<specificBlog>({
    queryKey: ["blog"],
    queryFn: () => getPostDetails(params.slug),
  });

  const { data: comments } = useQuery<IComments[]>({
    queryKey: ["comments"],
    queryFn: () => getComments(params.slug),
  });

  console.log("Blog", blog);
  console.log("comments", comments);

  const form = useForm<IPostComments>({
    initialValues: {
      name: "",
      email: "",
      comment: "",
      slug: "",
    },
  });

  let isFirstParagraph = true; // Flag to track the first paragraph

  const {
    mutate: mutateComments,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: () => postComments(form.values),
    onSuccess: () => {
      setMessage("Comment submitted for review");
      setShowMessage(true);
    },
    onError: () => {
      setMessage("Sorry, Error occurred");
      setShowMessage(true);
    },
  });

  const getContentFragment = ({ index, text, obj, type }: any) => {
    let modifiedText: JSX.Element | string = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    // Check if it's the first paragraph and apply drop cap to the first letter
    if (isFirstParagraph && type === "paragraph") {
      const dropCap = text[0];
      modifiedText = (
        <span key={index}>
          <span className={classes.dropCap}>{dropCap}</span>
          {text.slice(1)}
        </span>
      );
      isFirstParagraph = false; // Update flag to false after applying drop cap
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText}
          </h3>
        );
      case "paragraph":
        return (
          <Text size="lg" key={index} className="mb-8">
            {modifiedText}
          </Text>
        );
      case "heading-four":
        return (
          <div>
            <h4 key={index} className="text-md font-semibold mb-4">
              {modifiedText}
            </h4>
          </div>
        );
      case "image":
        return (
          <div>
            <img
              key={index}
              alt={obj.title}
              height={obj.height}
              width={obj.width}
              src={obj.src}
            />
            <br />
          </div>
        );
      default:
        return <span key={index}>{modifiedText}</span>;
    }
  };
  const timeAgo = (createdAt: string | undefined): string => {
    const currentTime = new Date();
    const createdAtTime = new Date(String(createdAt));
    const timeDifference = currentTime.getTime() - createdAtTime.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days === 1 ? "" : "s"} ago`;
    }
    if (hours > 0) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }
    if (minutes > 0) {
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    }
    return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutateComments();
  };

  const messageColor = isSuccess ? "green" : isError ? "red" : "black";

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showMessage) {
      timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showMessage]);

  console.log("form values", form.values);
  return (
    <div>
      <Hero />
      <Box
        style={{
          paddingLeft: mobileMatches ? "20px" : "62px",
          paddingRight: mobileMatches ? "20px" : "62px",
        }}
      >
        <Group justify="space-between">
          <Group justify="center">
            <BackBtn type="icon" />
            <Text style={{ fontSize: mobileMatches ? 18 : 42 }}>
              {blog?.title}
            </Text>
          </Group>

          <SocialMedia />
        </Group>
        <Divider pb="md" />
        <Grid>
          <Grid.Col span={mobileMatches ? 12 : 9}>
            <TypographyStylesProvider>
              <div>
                {blog?.content.raw.children.map((typeObj, index) => {
                  const children = typeObj.children.map((item, itemIndex) =>
                    getContentFragment({
                      index: itemIndex,
                      text: item.text,
                      obj: item,
                      type: typeObj.type,
                    })
                  );

                  return getContentFragment({
                    index,
                    text: children,
                    obj: typeObj,
                    type: typeObj.type,
                  });
                })}
              </div>
            </TypographyStylesProvider>
          </Grid.Col>
          <Grid.Col span={mobileMatches ? 12 : 3}>
            <form onSubmit={handleSubmit}>
              <Stack>
                <Paper
                  style={{ backgroundColor: "#e7e7e7" }}
                  p="lg"
                  radius="md"
                >
                  <Title>Leave a Reply</Title>
                  <Divider />
                  <Stack gap="lg" pt="lg">
                    <Textarea
                      radius="lg"
                      label="comments"
                      placeholder="leave a reply"
                      className={classes.input}
                      onChange={({
                        target: { value },
                      }: React.ChangeEvent<HTMLTextAreaElement>) => {
                        form.setFieldValue("comment", value);
                        form.setFieldValue("slug", blog?.slug);
                      }}
                    />
                    <TextInput
                      radius="lg"
                      label="name"
                      placeholder="name"
                      className={classes.input}
                      {...form.getInputProps("name")}
                    />
                    <TextInput
                      radius="lg"
                      label="email"
                      placeholder="email"
                      {...form.getInputProps("email")}
                      className={classes.input}
                    />

                    <Button
                      radius="lg"
                      type="submit"
                      className={classes.button}
                    >
                      <span className={classes.text}>Submit Comment</span>
                    </Button>
                    {showMessage && (
                      <Text style={{ color: messageColor }}>{message}</Text>
                    )}
                  </Stack>
                </Paper>
                <Paper
                  style={{ backgroundColor: "#e7e7e7" }}
                  p="lg"
                  radius="md"
                >
                  <Title>Comments</Title>
                  <Divider pb="lg" />

                  {comments && comments?.length > 0 ? (
                    comments?.map((comment) => (
                      <>
                        <Group>
                          <Avatar
                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                            alt="Jacob Warnhalter"
                            radius="xl"
                          />
                          <div>
                            <Text fw={700}>{comment.name}</Text>
                            <Text size="xs" c="dimmed">
                              {timeAgo(comment?.createdAt)}
                            </Text>
                          </div>
                        </Group>

                        <Text pl={54} pt="sm" size="sm">
                          {comment.comment}
                        </Text>
                      </>
                    ))
                  ) : (
                    <Text c="dimmed">
                      Be the first to comment on this post! 😊
                    </Text>
                  )}
                </Paper>
              </Stack>
            </form>
          </Grid.Col>
        </Grid>
      </Box>
    </div>
  );
}

export default Page;
