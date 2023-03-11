import { Story } from '@storybook/vue3'
import Data from './assets/jobs-masonry-data.json'
import JobsMasonryRoot from '@/components/jobs-masonry-root.vue'
import JobsCardSkeleton from '@/components/jobs-card-skeleton.vue'
import JobsCardRoot from '@/components/jobs-card-root.vue'

export default {
  title: 'Pages/Jobs/Masonry',
  component: JobsMasonryRoot
}

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { JobsMasonryRoot, JobsCardSkeleton, JobsCardRoot },
  setup () {
    return { args, data: Data }
  },
  template: `
    <jobs-masonry-root v-bind="args">
      <jobs-card-root       
        v-for="item in data"
        :key="item.id"
        :data="item"  
      />
      <template><template/>
    </jobs-masonry-root>`
})

export const Masonry = Template.bind({})
