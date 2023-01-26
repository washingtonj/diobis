export interface JobEntity {
  id: string
  number: number
  title: string
  createdBy: string
  createdAt: string
  avatarUrl: string
  tags: string[]
  markdown: string
  group: string
}
