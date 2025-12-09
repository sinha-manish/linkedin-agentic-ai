"use client";

import { usePosts } from "@/hooks/usePosts";
import PostEditor from "@/components/posts/PostEditor";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const router = useRouter();
  const { createPost } = usePosts();

  function handleCreate(content: string) {
    createPost.mutate({ content }, {
      onSuccess: () => router.push("/dashboard/posts"),
    });
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
      <PostEditor onSubmit={handleCreate} />
    </div>
  );
}
