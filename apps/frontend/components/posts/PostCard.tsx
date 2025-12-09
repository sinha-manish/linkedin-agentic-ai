import { PostCardProps } from "@/types/appTypes";

export default function PostCard({ post }:PostCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="font-medium mb-2">Post #{post.id}</h3>
      <p className="text-gray-700 whitespace-pre-line">{post.content}</p>

      {post.engagement_score !== undefined && (
        <p className="text-sm text-gray-500 mt-3">
          Engagement Score: <strong>{post.engagement_score}</strong>
        </p>
      )}
    </div>
  );
}
