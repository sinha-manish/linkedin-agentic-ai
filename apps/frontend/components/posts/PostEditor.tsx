"use client";

import { useState } from "react";
import api from "@/lib/api";
import { PostEditorProps } from "@/types/appTypes";

export default function PostEditor({ onSubmit }: PostEditorProps) {
  const [content, setContent] = useState("");
  const [model, setModel] = useState("gpt-4o-mini");
  const [loading, setLoading] = useState(false);

  async function improveWithAI() {
    setLoading(true);

    const res = await api.post("/ai/suggest", {
      prompt: content,
      model,
    });

    setContent((prev) => prev + "\n\n" + res.data.suggestion);
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <textarea
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post..."
        className="w-full p-3 border rounded-md"
      />

      <div className="flex gap-3 items-center">
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="gpt-4o-mini">gpt-4o-mini</option>
          <option value="gpt-4o">gpt-4o</option>
          <option value="gemini-pro">gemini-pro</option>
        </select>

        <button
          onClick={improveWithAI}
          className="px-4 py-2 bg-purple-600 text-white rounded-md"
        >
          {loading ? "Improving..." : "Improve with AI"}
        </button>

        <button
          onClick={() => onSubmit(content)}
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Save Post
        </button>
      </div>
    </div>
  );
}
