export interface PostComment {
  comment: string;
  comment_id: number;
  created_at: Date;
  commentator_img: string;
  commentator_account_name: string;
}

export interface OnePost {
  id: number;
  post: string;
  created_at: string;
  shares: number;
  views: number;
  imgs: Array<null | string>;
  account_name: string;
  owner_img: string;
  likes: number;
  user_liked: number;
  post_comments: PostComment[] | null;
  total_comments: number;
}
export interface ResGetPosts {
  result: OnePost[];
}
