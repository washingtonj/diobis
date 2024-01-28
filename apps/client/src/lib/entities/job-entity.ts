export interface JobEntity {
  title: string;
  userAvatar: string;
  description: string;
  tags: string[];
  createdAt: string;
  quantityOfComments: number;
  quantityOfLikes: number;
  source: string;
  sourceUrl: string;
}
