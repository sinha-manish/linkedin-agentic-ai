"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export function usePosts() {
  const queryClient = useQueryClient();

  // GET /posts
  const posts = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await api.get("/posts");
      return res.data;
    },
  });

  // POST /posts
  const createPost = useMutation({
    mutationFn: async (data: { content: string }) => {
      const res = await api.post("/posts", data);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });

  return { posts, createPost };
}
