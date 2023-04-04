<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
useHead({
  title: 'Diobis - A maneira mais eficiente de encontrar empregos no GitHub.',
  link: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;600;700&family=Poppins:wght@200;400;500;700&display=swap',
      rel: 'stylesheet'
    },
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
    },
    {
      href: 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.min.css',
      rel: 'stylesheet',
      integrity: 'sha512-KUoB3bZ1XRBYj1QcH4BHCQjurAZnCO3WdrswyLDtp7BMwCw7dPZngSLqILf68SGgvnWHTD5pPaYrXi6wiRJ65g==',
      crossorigin: 'anonymous',
      referrerpolicy: 'no-referrer'
    },
    { href: '/favicon.svg', rel: 'icon', type: 'image/svg+xml' }
  ],
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'A maneira mais eficiente de encontrar empregos no GitHub.'
    },
    {
      name: 'og:description',
      content: 'A maneira mais eficiente de encontrar empregos no GitHub.'
    },
    {
      name: 'twitter:title',
      content: 'Diobis - A maneira mais eficiente de encontrar empregos no GitHub.'
    },
    { name: 'twitter:site', content: '@diobis' },
    { name: 'twitter:creator', content: '@diobis' }
  ]
})
</script>
