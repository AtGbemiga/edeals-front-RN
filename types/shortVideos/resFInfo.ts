export interface ShortVideoComment {
  comment: null;
  comment_id: null;
  created_at: null;
  commentator_img: null;
  commentator_username: null;
}

export interface OneShortVideo {
  id: number;
  video: string;
  description: string;
  posted_on: Date;
  views: number;
  likes: number;
  video_user_id: number;
  video_user_name: string;
  video_user_img: string;
  comments: Comment[];
  user_has_liked: number;
}

export interface ResShortVideoFInfo {
  result: OneShortVideo[];
}
