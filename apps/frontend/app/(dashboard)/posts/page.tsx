"use client";

import Link from "next/link";
import PostCard from "@/components/posts/PostCard";
import { usePosts } from "@/hooks/usePosts";
import { PostCardProps } from "@/types/appTypes";

export default function PostsPage() {
    const { posts } = usePosts();

    if (posts.isLoading) return <p>Loading...</p>;
    if (posts.error) return <p>Error loading posts</p>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Posts</h2>
                <Link
                    href="/dashboard/posts/create"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    + Create New Post
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {posts.data.map((post: PostCardProps) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
