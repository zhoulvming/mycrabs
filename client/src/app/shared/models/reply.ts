export class Reply {
  id: string;
  content: string;
  member: {
    id: string,
    username: string,
    avatar_mini: string,
    avatar_normal: string,
    avatar_large: string
  };
  created: string;
  last_modified: string;
}