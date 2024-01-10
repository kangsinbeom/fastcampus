export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likeCount?: number;
  comments?: CommentProps[];
  hashTags?: string[];
  likes?: string[];
  imageUrl?: string;
}

export interface CommentFormProps {
  post: PostProps | null;
}

export interface CommentProps {
  comment: string;
  uid: string;
  email: string;
  createdAt: string;
}

export interface PostEditData {
  post: PostProps | null;
  hasTag: string;
  imageFile: string | null;
  isSubmitting: boolean;
}

export interface FollowingUserData {
  id: string;
}

export interface NotificationProps {
  id: string;
  uid: string;
  url: string;
  isRead: boolean;
  content: string;
  createdAt: string;
}
