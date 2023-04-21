import { describe, it, expect } from 'vitest'
import { JobEntity } from '@/server/domain/entities'

describe('JobEntity', () => {
  it('Should have the correct data types', () => {
    const job: JobEntity = {
      created_at: '2021-01-01T00:00:00Z',
      id: 'id',
      title: 'Job Title',
      markdown: 'Job Description',
      repository: {
        group: 'group',
        repo: 'repo'
      },
      tags: ['tag1', 'tag2'],
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        login_id: 'login_id'
      },
      interactions: {
        comments: 1
      },
      reactions: {
        confused: 1,
        eyes: 1,
        heart: 1,
        rocket: 1
      }
    }

    expect(typeof job.created_at).toBe('string')
    expect(typeof job.id).toBe('string')
    expect(typeof job.title).toBe('string')
    expect(typeof job.markdown).toBe('string')
    expect(typeof job.repository.group).toBe('string')
    expect(typeof job.repository.repo).toBe('string')
    expect(typeof job.tags[0]).toBe('string')
    expect(typeof job.tags[1]).toBe('string')
    expect(typeof job.user.avatar_url).toBe('string')
    expect(typeof job.user.login_id).toBe('string')
    expect(typeof job.interactions?.comments).toBe('number')
    expect(typeof job.reactions?.confused).toBe('number')
    expect(typeof job.reactions?.eyes).toBe('number')
    expect(typeof job.reactions?.heart).toBe('number')
    expect(typeof job.reactions?.rocket).toBe('number')
  })
})
