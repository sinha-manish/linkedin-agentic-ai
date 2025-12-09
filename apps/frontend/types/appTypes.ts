import { ReactNode } from "react";
import { IPost } from "@pkg/types";
export type LayoutProps = {
  children: ReactNode;
};

export interface PostEditorProps {
  onSubmit: (content: string) => void;
}

export interface PostCardProps {
  post: IPost;
}