export interface JobEntity {
  id: string
  number: number
  title: string
  createdBy: string
  createdAt: string
  avatarUrl: string
  tags: string[]
  markdown: string
  reactions?: {
    confused?: number
    heart?: number
    rocket?: number
    eyes?: number
  },
  interactions?: {
    comments?: number
  }
  group: string
}
