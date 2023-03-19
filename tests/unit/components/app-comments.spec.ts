// @vitest-environment jsdom

import { describe, it, expect } from 'vitest'
import AppComments from '@/components/app-comments.vue'
import { render } from '@/tests/utils/render'

describe('AppComments', () => {
  it('Should render with all user informations', () => {
    const wrapper = render(AppComments, {
      props: {
        comments: [
          {
            isAuthor: false,
            name: 'Washington Junior',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            date: '2021-01-01T00:00:00.000Z',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies ultricies, nisl nisl aliquet nisl, eget aliquet nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies ultricies, nisl nisl aliquet nisl, eget aliquet nisl nisl sit amet nisl.'
          }
        ]
      }
    })

    expect(wrapper.text()).toContain('Washington Junior')
    expect(wrapper.text()).toContain('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies ultricies, nisl nisl aliquet nisl, eget aliquet nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies ultricies, nisl nisl aliquet nisl, eget aliquet nisl nisl sit amet nisl.')
    expect(wrapper.find('img')).toBeTruthy()
  })

  it('Should render with author user informations', () => {
    const wrapper = render(AppComments, {
      props: {
        comments: [{
          isAuthor: true,
          name: 'John Doe',
          avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
          date: '2021-01-01T00:00:00.000Z',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies ultricies, nisl nisl aliquet nisl, eget aliquet nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies ultricies, nisl nisl aliquet nisl, eget aliquet nisl nisl sit amet nisl.'
        }]
      }
    })

    expect(wrapper.text()).toContain('Autor')
  })
})
