import { Box } from "@mantine/core";

import Blog from "@/components/blog/Blog";
import Hero from "@/components/hero/Hero";

// import { getPosts, getRecentPosts } from "@/services"

export default function Home() {
  return (
    <main>
      <Box>
        <Hero />
        <Blog />
      </Box>
    </main>
  );
}
