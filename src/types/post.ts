export type StandardApiResponse = {
  success: boolean;
  status: number;
  message: string;
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  description: string;
  content: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category: string;
};