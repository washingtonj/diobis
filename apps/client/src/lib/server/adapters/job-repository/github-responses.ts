export interface GitHubResponse {
  number: number;
  title: string;
  created_at: string;
  html_url: string;
  user: {
    avatar_url: string;
    login: string;
  };
  labels: Array<{
    name: string;
  }>;
  body: string;
  reactions: {
    confused: number;
    eyes: number;
    heart: number;
    rocket: number;
  };
  comments: number;
}
