export interface IUser {
  id: string;
  email: string;
  org_id: string;
  role: 'admin' | 'user';
}

export interface IPost {
  id: string;
  content: string;
  authorId: string;
  engagement_score?: number;
  createdAt?: string;
  updatedAt?: string;
}
