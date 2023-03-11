import { Story } from '@storybook/vue3'
import JobContent from '@/components/job-content.vue'

export default {
  title: 'Pages/Job/Content',
  component: JobContent
}

const Template: Story = args => ({
  components: { JobContent },
  setup () {
    return { args }
  },
  template: '<job-content v-bind="args" />'
})

export const Content = Template.bind({})
Content.args = {
  content: "## Our Company\r\n\r\nAbout IntruderLabs: IntruderLabs is a rapidly growing cybersecurity company that specializes in offensive security. We work with many clients to help them identify vulnerabilities in their systems and improve their security posture. Our team of experienced professionals is dedicated to providing high-quality services and products that help our clients stay secure in an ever-changing threat landscape. See more [here](https://www.linkedin.com/company/intruder-labs/).\r\n\r\n## Job description\r\n\r\nAbout the Role: As a mid-level Software Engineer at IntruderLabs, you will be responsible for developing cybersecurity products that help our clients stay secure. You will work closely with our team of experienced professionals to design and implement secure, scalable, and easy-to-maintain software solutions. You will also have the opportunity to work with cutting-edge technologies such as GoLang, OpenSearch, and AWS.\r\n\r\nKey Responsibilities:\r\n\r\n•\tDevelop software solutions using Clean Architecture, Hexagonal Architecture, Clean Code, DDD, TDD, Automated Testing and SOLID principles\r\n•\tCollaborate with other team members to identify and solve complex software engineering problems\r\n•\tWrite clean, well-documented code that is easy to maintain\r\n•\tWork with cutting-edge technologies such as GoLang, OpenSearch, and AWS\r\n•\tStay up-to-date with the latest trends and best practices in software engineering and cybersecurity\r\n\r\n## Place\r\n\r\nRemote.\r\n\r\n## Requirements\r\n\r\n•\tRegular knowledge of Clean Architecture, Hexagonal Architecture, Clean Code, DDD, TDD, Automated Testing and SOLID\r\n•\tExperience with at least one programming language (e.g. GoLang, Python, Java)\r\n•\tFamiliarity with software development tools (e.g. Git, JIRA)\r\n•\tExperience with databases (e.g. MySQL, PostgreSQL, MongoDB)\r\n•\tUnderstanding of security concepts and principles\r\n•\tStrong communication and interpersonal skills\r\n•\tAbility to work effectively in a team environment\r\n•\tStrong problem-solving and analytical skills\r\n•\tAbility to adapt to new technologies and learn quickly\r\n•\tAttention to detail and ability to produce high-quality work\r\n\r\n## Desired Skills:\r\n•\tExperience with GoLang, OpenSearch, and AWS\r\n•\tExperience in Security related fields\r\n•\tFamiliarity with Docker and Kubernetes\r\n\r\n## Benefits\r\n\r\nIt's going to be combined.\r\n\r\n## Hiring\r\n\r\nIt's going to be combined.\r\n\r\n## How to apply\r\n\r\nIf you are looking for an exciting opportunity to work with cutting-edge technologies and help clients stay secure, then IntruderLabs is the right place for you. We offer a dynamic and collaborative work environment, competitive salary, and benefits package, as well as opportunities for career growth and development. Apply now and join our team of cybersecurity professionals who are dedicated to making the world a safer place.\r\n\r\nPlease, send an e-mail to: `frios at intruderlabs dot com dot br` with your Linkedin and GitHub links. Set the \"Software Engineer Position\" as the subject.\r\n\r\n## Labels\r\n\r\n### Level\r\n\r\n- Full\r\n\r\n### Regimen\r\n\r\n- CLT\r\n- Contract\r\n\r\n### Allocation\r\n\r\n- Remote"
}
